import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./resources/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./resources/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const jaro = localFont({
  src: "./resources/fonts/Jaro.ttf",
  variable: "--font-jaro",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Our Shop"
} as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${jaro.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
