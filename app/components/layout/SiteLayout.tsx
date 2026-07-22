import type { Hotlines } from "../../lib/content.server";
import { EmergencyHotlineBar } from "./EmergencyHotlineBar";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteLayout({
  children,
  hotlines,
}: {
  children: React.ReactNode;
  hotlines: Hotlines | null;
}) {
  return (
    <>
      <EmergencyHotlineBar hotlines={hotlines} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
