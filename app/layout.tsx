import './globals.css';

import { GeistSans } from 'geist/font/sans';

let title = 'Todo App';
let description = 'Don\'t forget anything';

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://nextjs-postgres-auth.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-[19px] md:text-[16px]">
      <body className={GeistSans.variable}>{children}</body>
    </html>
  );
}
