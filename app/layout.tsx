import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ViewTransitions } from "next-view-transitions";

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full-stack Student Dashboard",
  description: "Instinctive Studio Full-stack Student Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${notoSans.variable} ${notoSansMono.variable} ${notoSans.className} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
