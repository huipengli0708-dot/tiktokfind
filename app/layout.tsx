import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "阿光选品 | TikTok 爆款商品研究",
    template: "%s | 阿光选品",
  },
  description: "专注 TikTok 爆款商品研究与选品方法论，帮助创作者和卖家精准找到高利润爆款品类。",
  keywords: ["TikTok选品", "爆款商品", "跨境电商", "TikTok Shop", "选品工具"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
