import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "Avie Sinar | Software Engineer",
  description: "Created with NextJS",
};

const roboto = Roboto({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
