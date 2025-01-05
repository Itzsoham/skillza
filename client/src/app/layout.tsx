import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "sonner";

import Providers from "./Providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Skillza",
  description: "Skillza is a platform for learning new skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className}`}>
        <ClerkProvider>
          <Providers>
            <Suspense fallback={null}>
              <div className="root-layout">{children}</div>
            </Suspense>
            <Toaster richColors closeButton />
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
