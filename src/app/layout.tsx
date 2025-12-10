import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Worship Song Manager",
  description: "Simple worship song manager for church worship teams.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-root">
          <Navbar />
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
