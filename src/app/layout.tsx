import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "💕 Be My Valentine, Khushi? 💕",
  description: "A special Valentine's message from Sharman to Khushi",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "💕 Be My Valentine, Khushi? 💕",
    description: "Someone has a very important question for you...",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "💕 Be My Valentine, Khushi? 💕",
    description: "Someone has a very important question for you...",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
