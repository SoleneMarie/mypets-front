import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway, Knewave } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const knewave = Knewave({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-knewave",
});

export const metadata: Metadata = {
  title: "My Pets",
  description: "Une app au poil",
  icons: "/paws.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} ${knewave.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
