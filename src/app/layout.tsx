import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/components/navigation/TopNavbar";
import SecondaryNavbar from "@/components/navigation/SecondaryNavbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sedeer",
  description: "A medical equipments supply store",
  icons: {
    icon: "/favicon.svg",
  },
};
// if (true) {
//   toast.success("Error: This is a test error message");
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <TopNavbar />
        <SecondaryNavbar />
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  );
}
