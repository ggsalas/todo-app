import "./globals.css";

import { GeistSans } from "geist/font/sans";
import Favicon from "/public/favicon.ico";
import { Analytics } from "@vercel/analytics/react"

let title = "Dooet";
let description = "Don't forget anything";

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-[19px] md:text-[16px]">
      <Analytics />
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
