// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

import Header from "@/components/header/Header";
import Footer from "@/components/rootPage/Footer";
import BottomNav from "@/components/header/BottomNav";

import ProviderWrapper from "./providers/ProviderWrapper";
import AuthProvider from "./providers/authProvider";
import AuthModalsProvider from "@/context/authModalsContext";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for Next.js App Router
export const metadata = {
  title: "Retro Emporium",
  description:
    "Step into the past with Retro Emporium – vintage-inspired clothing and accessories for the modern trendsetter.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderWrapper>
          <AuthProvider>
            <AuthModalsProvider>
              <Header />

              <main className="mx-auto max-w-screen-2xl shadow-xl">
                {children}
                <ToastContainer autoClose={2000} position="top-right" />
              </main>

              <Footer />

              {/* Mobile Only Bottom Nav */}
              <div className="fixed bottom-0 w-full md:hidden">
                <BottomNav />
              </div>
            </AuthModalsProvider>
          </AuthProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
