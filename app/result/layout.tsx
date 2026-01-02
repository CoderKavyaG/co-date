import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Birthday Place | If Your Birthday Were a Place",
  description: "Discover the geographic location that corresponds to your birthday.",
  openGraph: {
    title: "If Your Birthday Were a Place",
    description: "Discover the geographic location that corresponds to your birthday through mathematical mapping.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "If Your Birthday Were a Place",
    description: "Discover the geographic location that corresponds to your birthday.",
  },
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
