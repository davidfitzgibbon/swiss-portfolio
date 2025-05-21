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
    <html lang="en" className={monaSans.variable}>
      <body className="font-regular bg-white p-6 text-black antialiased md:text-xl">
        <Header />
        <Separator />
        <main className="mx-auto w-full max-w-5xl">{children}</main>
        <Separator />
        <Footer />
      </body>
    </html>
  );
}
