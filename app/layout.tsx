import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/ui/provider";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import LenisProvider from "@/components/LenisProvider";
import 'lenis/dist/lenis.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your App",
  description: "Smooth scroll with Lenis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Providers>
          <LenisProvider>
            <Navbar />
            <div className="min-h-screen w-full relative flex flex-col dark">
              <main className="flex-1">
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </main>
              <Footer />
            </div>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              pauseOnHover
              theme="dark"
            />
          </LenisProvider>
        </Providers>
      </body>
    </html>
  );
}
