import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TheHeader from "@/components/the_header";
import TheFooter from "@/components/the_footer";
import ReduxProvider from "@/store/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full stack app",
  description: "Full stack by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <TheHeader></TheHeader>
          {children}
          <TheFooter></TheFooter>
        </ReduxProvider>
      </body>
    </html>
  );
}
