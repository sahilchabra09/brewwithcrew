import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brewwithcrew.com"),
  title: {
    default: "Brew with Crew",
    template: "%s | Brew with Crew",
  },
  description:
    "Technology partner for startups and growing businesses building SaaS, AI, e-commerce, and custom software.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brew with Crew",
    description:
      "Technology partner for startups and growing businesses building SaaS, AI, e-commerce, and custom software.",
    url: "/",
    siteName: "Brew with Crew",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Brew with Crew homepage preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brew with Crew",
    description:
      "Technology partner for startups and growing businesses building SaaS, AI, e-commerce, and custom software.",
    images: ["/opengraph-image"],
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
        className={`${interTight.variable} ${jetBrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
