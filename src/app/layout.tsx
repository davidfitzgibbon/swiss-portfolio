import { Mona_Sans } from "next/font/google";
import clsx from "clsx";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/Separator";

import "./globals.css";

const monaSans = Mona_Sans({
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-mona-sans",
  display: "swap",
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
        className={clsx(
          "antialiased font-regular bg-white text-black",
          monaSans.variable,
        )}
      >
        <Header />
        <Separator />
        {children}
        <Separator />
        <Footer />
      </body>
    </html>
  );
}
