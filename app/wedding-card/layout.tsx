import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avie & Ayuni Wedding Invitation",
  description:
    "Join us in celebrating our special day! We invite you to witness our love story unfold.",
  keywords: "wedding, invitation, celebration, love, Avie, Ayuni",
  authors: [{ name: "Avie & Ayuni" }],
  openGraph: {
    title: "Avie & Ayuni Wedding Invitation",
    description:
      "Join us in celebrating our special day! We invite you to witness our love story unfold.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avie & Ayuni Wedding Invitation",
    description:
      "Join us in celebrating our special day! We invite you to witness our love story unfold.",
  },
};

export default function WeddingCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
