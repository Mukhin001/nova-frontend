import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import AuthInitializer from "@/providers/AuthInitializer";
import ScreenWatcher from "@/providers/ScreenWatcher";
import Toast from "@/components/ui/toast/Toast";

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
        <StoreProvider>
          <ScreenWatcher />
          <AuthInitializer />
          <Header></Header>

          {children}
          <Footer></Footer>
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
