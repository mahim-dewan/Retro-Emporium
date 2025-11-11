import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/Sidebar";
import ProductEditForm from "@/components/admin/ProductEditForm";
import EditFormWrapper from "@/app/providers/EditFormProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-dark`}
      >
        <SidebarProvider>
          <AdminSidebar />
          <EditFormWrapper>
            <ProductEditForm />
            <div className="flex-1 my-2 px-2">{children}</div>
          </EditFormWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}
 