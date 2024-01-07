import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import { Header } from "./components/navigation";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Auction App",
  description: "Unlock Extraordinary Possibilities - Bid, Win, Thrive!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
