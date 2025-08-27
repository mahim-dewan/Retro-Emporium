import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import LoginForm from "@/components/auth/LoginForm";
import { ToastContainer } from "react-toastify";
import RegisterForm from "@/components/auth/RegisterForm";
import Footer from "@/components/rootPage/Footer";
import BottomNav from "@/components/header/BottomNav";
import ProviderWrapper from "./providers/ProviderWrapper";
import AuthProvider from "./providers/authProvider";
import AuthModalsProvider from "@/context/authModalsContext";
import ProductEditForm from "@/components/admin/ProductEditForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Retro Emporium",
  description:
    "Step into the past with Retro Emporium – vintage-inspired clothing and accessories for the modern trendsetter.",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProviderWrapper>
          <AuthProvider>
            <AuthModalsProvider>
                {/* Login Form  */}
                <LoginForm
                  className={
                    "absolute top-1/2 md:top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  }
                />
                {/* Register Form  */}
                <RegisterForm
                  className={
                    "absolute top-1/2 md:top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  }
                />
                <Header />
                <main className="max-w-[1500px] mx-auto shadow-xl">
                  {children}

                  <ToastContainer autoClose={2000} position="top-right" />
                </main>
              {/* Bottom Navbar  */}
              <div className="fixed bottom-0 w-full md:hidden">
                <BottomNav />
              </div>
              <Footer />
            </AuthModalsProvider>
          </AuthProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
