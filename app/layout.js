//Layout Page will affect all components

import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { NextAuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <div className="max-w-5xl mx-auto px-8">
            <Navbar />
            <div className="pt-16">{children}</div>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
