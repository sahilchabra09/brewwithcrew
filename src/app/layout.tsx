import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { GsapProvider } from "@/components/gsap/gsap-provider";
import { CursorGlow } from "@/components/decor";
import { IntroOverlay } from "@/components/intro";
import { Header } from "@/components/site";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brewwithcrew.com"),
  title: {
    default: "Brew with Crew — Serious software, freshly brewed.",
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
        className={`${interTight.variable} ${jetBrainsMono.variable} ${fraunces.variable} antialiased`}
      >
        <IntroOverlay />
        <CursorGlow />
        <Header />
        <GsapProvider>{children}</GsapProvider>
      </body>
    </html>
  );
}
