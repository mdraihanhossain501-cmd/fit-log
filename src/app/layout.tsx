import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "sonner";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FitLog — Train Hard, Log Honest",
  description: "A dark, no-nonsense gym companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-black text-white font-sans antialiased min-h-screen flex flex-col justify-between">
        <PlanProvider>
          <Toaster position="bottom-right" theme="dark" />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}