export function DataSourceNote({ lastUpdated, source }: { lastUpdated: string; source: string }) {
  return (
    <p role="note">
      <strong>Data last updated:</strong> {lastUpdated} — <em>{source}</em>
    </p>
  );
}
