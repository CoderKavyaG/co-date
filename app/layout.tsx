import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'),
  title: "co-date | Your Birthday, Mapped ✨",
  description: "Every date has a coordinate. Enter your birthday and discover where in the world it lives. A fun, open-source experiment.",
  openGraph: {
    title: "co-date | Your Birthday, Mapped ✨",
    description: "Every date has a coordinate. Enter your birthday and discover where in the world it lives. A fun, open-source experiment.",
    type: "website",
    images: [
      {
        url: '/preview-card.png',
        width: 1200,
        height: 630,
        alt: 'co-date preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "co-date | Your Birthday, Mapped ✨",
    description: "Every date has a coordinate. Enter your birthday and discover where in the world it lives. A fun, open-source experiment.",
    images: ['/preview-card.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
