import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const SITE_URL = "https://ethertecsys.com";

export const metadata: Metadata = {
  title: "Ethertecsys DCG | Portland's AI Syndicate",
  description: "Dominance, not excuses. AI lead domination for non-conformist builders and rodders in Portland, OR.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Ethertecsys DCG",
    title: "Ethertecsys DCG | Portland's AI Syndicate",
    description: "Roofers, builders & hot rod shops: stop leaving $100k+/year on the table. Ethertecsys DCG builds AI systems that dominate local search and automate follow-ups while you work.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ethertecsys DCG — Portland's AI Syndicate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethertecsys DCG | Portland's AI Syndicate",
    description: "Roofers, builders & hot rod shops: stop leaving $100k+/year on the table. AI systems that dominate local search and automate follow-ups.",
    images: ["/og-image.jpg"],
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
        className={`${inter.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
