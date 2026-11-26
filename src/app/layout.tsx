import type { Metadata } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Avira Law | Legal Platform",
  description: "Avira Legal Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <MotionProvider>
          <SiteChrome />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
