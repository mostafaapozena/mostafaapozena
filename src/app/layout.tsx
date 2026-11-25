import type { Metadata } from "next";
import { Inter, Space_Grotesk, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import { profile } from "@/data/portfolio";

const sans = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const sign = Mrs_Saint_Delafield({ variable: "--font-sign", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${profile.firstName} ${profile.lastName} — ${profile.role}`,
  description: profile.intro,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${sign.variable} antialiased`}>
      <body>
        <SmoothScroll>
          <Cursor />
          <Navbar />
          {children}
        </SmoothScroll>
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
