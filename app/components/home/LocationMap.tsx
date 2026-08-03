const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=119.9179%2C16.1147%2C120.0379%2C16.1947&layer=mapnik&marker=16.1547%2C119.9779";

export function LocationMap({ title }: { title: string }) {
  return (
    <div className="h-full overflow-hidden rounded-lg border border-[var(--color-kapwa-border-weak)]">
      <iframe title={title} src={MAP_EMBED_SRC} className="h-full min-h-96 w-full" loading="lazy" />
    </div>
  );
}
