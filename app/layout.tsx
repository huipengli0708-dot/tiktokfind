import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import PostHogProvider from "@/components/PostHogProvider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "阿光选品 | TikTok 爆款商品研究",
    template: "%s | 阿光选品",
  },
  description: "每日爆款视频拆解 + 每日新品，帮助跨境卖家和创作者精准选品。",
  keywords: ["TikTok选品", "爆款商品", "跨境电商", "TikTok Shop", "选品工具"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${geistSans.variable} antialiased`}>
      <body className="min-h-screen">
        <PostHogProvider />
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
