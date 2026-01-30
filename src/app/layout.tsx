import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/global.css";
import "@/styles/theme.css";
import "@/styles/layout.css";
import "@/styles/button.css";
import "@/styles/form.css";
import StoreProvider from "@/store/StoreProvider";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import AuthInitializer from "@/providers/AuthInitializer";
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
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('theme');
                  document.documentElement.setAttribute('data-theme',
                    theme === 'dark' ? 'dark' : 'light'
                  );
                } catch (e) {}
              })();
            `,
          }}
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <AuthInitializer />
          <Toast />
          <Header></Header>
          {children}
          <Footer></Footer>
        </StoreProvider>
      </body>
    </html>
  );
}
