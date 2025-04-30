import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "پنل ادمین",
  description: "پنل مدیریت با Shadcn UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
