import type { Metadata } from "next";
import { Bebas_Neue, Syne, Epilogue } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
});

export const metadata: Metadata = {
  title: "SHANDAAR PRINT | Bohot Shandaar Desi Streetwear",
  description: "Karachi-made heavyweight graphic tees & premium tote bags designed for Pakistani Gen Z. Funny, relatable, unapologetic. Tension lene ka nahi!",
  openGraph: {
    title: "SHANDAAR PRINT | Bohot Shandaar Desi Streetwear",
    description: "Karachi-made heavyweight graphic tees & premium tote bags designed for Pakistani Gen Z.",
    type: "website",
    locale: "en_PK",
    siteName: "Shandaar Print",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${bebas.variable} ${syne.variable} ${epilogue.variable} bg-bg text-text1 font-body`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
