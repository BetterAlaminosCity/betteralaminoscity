export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {year} BetterAlaminosCity.org. MIT Licensed. Open source on GitHub.</p>
    </footer>
  );
}
