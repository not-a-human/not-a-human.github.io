import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Cinzel, Tangerine } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "Avie Sinar | Software Engineer",
  description: "Created with NextJS",
};

const roboto = Roboto({
  variable: "--font-roboto",
  weight: "400",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const tangerine = Tangerine({
  variable: "--font-tangerine",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${cinzel.variable} ${tangerine.variable}`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
