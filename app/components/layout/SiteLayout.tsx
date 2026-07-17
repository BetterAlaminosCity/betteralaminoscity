import { Disclaimer } from "./Disclaimer";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Disclaimer />
      <Footer />
    </>
  );
}
