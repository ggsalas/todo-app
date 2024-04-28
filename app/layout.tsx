import "./globals.css";

import { GeistSans } from "geist/font/sans";
import Favicon from "/public/favicon.ico";
import { Analytics } from "@vercel/analytics/react"
import { ServiceWorker } from "./ServiceWorker";

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
  manifest: '/manifest.json',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-[19px] md:text-[16px]">
      <Analytics />
      <ServiceWorker />
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
