import clsx from "clsx";
import { Mona_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
          "bg-white p-6 font-regular text-black antialiased",
          monaSans.variable,
        )}
      >
        <Header />
        <Separator />
        <main className="mx-auto w-full max-w-2xl">{children}</main>
        <Separator />
        <Footer />
      </body>
    </html>
  );
}
