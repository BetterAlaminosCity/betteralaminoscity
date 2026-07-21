export interface CitizensCharterServiceDraft {
  number: string;
  title: string;
  officeOrDivision: string;
  classification: string;
  typeOfTransaction: string;
  whoMayAvail: string;
  rawBody: string;
}

const SERVICE_HEADING_PATTERN = /^(\d+\.\d+)\s+(.+)$/;
const OFFICE_PATTERN = /^Office(?: or Division| ?\/ ?Division)?:\s*(.+)$/i;
const CLASSIFICATION_PATTERN = /^Classification:\s*(.+)$/i;
const TRANSACTION_PATTERN = /^Type of Transaction:\s*(.+)$/i;
const AVAIL_PATTERN = /^Who may avail:\s*(.+)$/i;

// Number of lines to look ahead, past a heading-shaped line, when deciding
// whether it is really a new service heading (as opposed to a CLIENT
// STEPS/AGENCY ACTIONS table row like "1.1 Request for farm input..." that
// happens to match the same "N.N " shape). A real service heading is always
// followed shortly by an "Office or Division:" line; a table sub-step row
// never is.
const HEADING_LOOKAHEAD_WINDOW = 8;

export function parseCitizensCharterText(text: string): CitizensCharterServiceDraft[] {
  // pdftotext inserts form-feed characters (\f) between PDF pages. When a
  // real heading happens to be the first content on a new page, the raw line
  // looks like "\f1.7 Requisition of E-Kawayan Products" and the leading \f
  // stops SERVICE_HEADING_PATTERN from matching at the true start of the
  // line. Strip form feeds up front so they can never corrupt a heading.
  const lines = text.replace(/\f/g, "").split("\n");
  const drafts: CitizensCharterServiceDraft[] = [];
  let current: CitizensCharterServiceDraft | null = null;
  let bodyLines: string[] = [];

  // Diagnostic-only bookkeeping: every heading-shaped line that failed the
  // lookahead check (and was therefore treated as ordinary body text, not a
  // new draft) is recorded here. This does not affect parsing behavior or
  // the return value — see the console.warn loop after the main pass below.
  const rejectedHeadingCandidates: Array<{ lineNumber: number; text: string }> = [];

  const flush = () => {
    if (current) {
      current.rawBody = bodyLines.join("\n").trim();
      drafts.push(current);
    }
  };

  // Distinguishes a genuine service heading from a table sub-step number
  // that happens to match the same "N.N " regex shape. Looks ahead a bounded
  // number of lines for an OFFICE_PATTERN match, but gives up early if
  // another heading-shaped line appears first (which would mean we're still
  // inside a table of numbered steps, not approaching a real heading's
  // office line).
  const isFollowedByOfficeLine = (startIndex: number): boolean => {
    const end = Math.min(lines.length, startIndex + 1 + HEADING_LOOKAHEAD_WINDOW);
    for (let i = startIndex + 1; i < end; i++) {
      // `pdftotext -layout` inconsistently indents the "Office or Division:"
      // label with a leading space on some pages, so trim both ends before
      // testing against the (start-anchored) label pattern.
      const candidate = lines[i].trim();
      if (OFFICE_PATTERN.test(candidate)) return true;
      if (SERVICE_HEADING_PATTERN.test(lines[i].trimEnd())) return false;
    }
    return false;
  };

  for (let index = 0; index < lines.length; index++) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();
    const heading = line.match(SERVICE_HEADING_PATTERN);
    if (heading) {
      if (isFollowedByOfficeLine(index)) {
        flush();
        current = {
          number: heading[1],
          title: heading[2].trim(),
          officeOrDivision: "",
          classification: "",
          typeOfTransaction: "",
          whoMayAvail: "",
          rawBody: "",
        };
        bodyLines = [];
        continue;
      }
      // Heading-shaped but rejected by the lookahead (most commonly a
      // CLIENT STEPS/AGENCY ACTIONS table sub-step row). Record it so the
      // diagnostic below can surface it — it still falls through to
      // ordinary body-line handling, exactly as before.
      rejectedHeadingCandidates.push({ lineNumber: index + 1, text: line });
    }
    if (!current) continue;

    // As above: the label lines are sometimes indented with a leading space
    // depending on the source page, so match against a fully-trimmed line.
    const trimmedLine = line.trim();
    const officeMatch = trimmedLine.match(OFFICE_PATTERN);
    const classificationMatch = trimmedLine.match(CLASSIFICATION_PATTERN);
    const transactionMatch = trimmedLine.match(TRANSACTION_PATTERN);
    const availMatch = trimmedLine.match(AVAIL_PATTERN);

    if (officeMatch) current.officeOrDivision = officeMatch[1].trim();
    else if (classificationMatch) current.classification = classificationMatch[1].trim();
    else if (transactionMatch) current.typeOfTransaction = transactionMatch[1].trim();
    else if (availMatch) current.whoMayAvail = availMatch[1].trim();
    else bodyLines.push(rawLine);
  }
  flush();

  // Diagnostic only: warn about every heading-shaped line that was never
  // accepted as a real service heading. Most of these are expected (table
  // sub-step rows, which never have an Office or Division line nearby — see
  // the "table sub-step numbers" regression test), but this is exactly the
  // signal that would have caught the 1.7 (form-feed) and 1.4
  // (indented-label) drops during development, had it existed then. This is
  // intentionally a diagnostic-only side effect: it never throws and never
  // changes `drafts`, so it does not alter this function's contract.
  for (const candidate of rejectedHeadingCandidates) {
    console.warn(
      `parseCitizensCharterText: line ${candidate.lineNumber} looks like a heading ` +
        `("${candidate.text}") but was not accepted as one — no "Office or Division:" ` +
        `line found within ${HEADING_LOOKAHEAD_WINDOW} lines. This is expected for ` +
        `CLIENT STEPS/AGENCY ACTIONS table sub-step rows, but if this is a real ` +
        `service heading, increase HEADING_LOOKAHEAD_WINDOW or investigate the source text.`,
    );
  }

  return drafts;
}
