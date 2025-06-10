import { ViewTransitions } from "next-view-transitions";
import { Mona_Sans } from "next/font/google";
import { BorderTriangles } from "@/components/BorderTriangles";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
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
    <ViewTransitions>
      <html lang="en" className={monaSans.variable}>
        <body className="font-regular bg-white p-6 text-black antialiased md:text-xl">
          <Header />
          <main className="relative mx-auto w-full max-w-5xl py-16">
            <BorderTriangles />
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
