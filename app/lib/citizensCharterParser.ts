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

export function parseCitizensCharterText(text: string): CitizensCharterServiceDraft[] {
  const lines = text.split("\n");
  const drafts: CitizensCharterServiceDraft[] = [];
  let current: CitizensCharterServiceDraft | null = null;
  let bodyLines: string[] = [];

  const flush = () => {
    if (current) {
      current.rawBody = bodyLines.join("\n").trim();
      drafts.push(current);
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const heading = line.match(SERVICE_HEADING_PATTERN);
    if (heading) {
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
    if (!current) continue;

    const officeMatch = line.match(OFFICE_PATTERN);
    const classificationMatch = line.match(CLASSIFICATION_PATTERN);
    const transactionMatch = line.match(TRANSACTION_PATTERN);
    const availMatch = line.match(AVAIL_PATTERN);

    if (officeMatch) current.officeOrDivision = officeMatch[1].trim();
    else if (classificationMatch) current.classification = classificationMatch[1].trim();
    else if (transactionMatch) current.typeOfTransaction = transactionMatch[1].trim();
    else if (availMatch) current.whoMayAvail = availMatch[1].trim();
    else bodyLines.push(rawLine);
  }
  flush();

  return drafts;
}
