import type { Metadata } from "next";
import { Mona_Sans } from 'next/font/google';
import { Header } from "@/components/Header";
import "./globals.css";
import { Separator } from "@/components/Separator";

const monaSans = Mona_Sans({
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-mona-sans",
  display: 'swap',
  subsets: ["latin"],
  
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} antialiased font-regular bg-white text-black `}
      >
        <Header />
        <Separator />
        {children}
        <Separator />
      </body>
    </html>
  );
}
