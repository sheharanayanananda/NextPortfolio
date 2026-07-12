import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AnalyticsTracker from "./components/AnalyticsTracker";

const anthropicSans = localFont({
  src: [
    // Roman (Normal)
    {
      path: "../public/fonts/AnthropicSans-Roman-Web.latin.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+0020-007F",
    },
    {
      path: "../public/fonts/AnthropicSans-Roman-Web.latin1.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+00A0-00FF",
    },
    {
      path: "../public/fonts/AnthropicSans-Roman-Web.symbols.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+2000-27FF",
    },
    // Italic
    {
      path: "../public/fonts/AnthropicSans-Italic-Web.latin.woff2",
      weight: "300 800",
      style: "italic",
      // @ts-ignore
      unicodeRange: "U+0020-007F",
    },
    {
      path: "../public/fonts/AnthropicSans-Italic-Web.latin1.woff2",
      weight: "300 800",
      style: "italic",
      // @ts-ignore
      unicodeRange: "U+00A0-00FF",
    },
    {
      path: "../public/fonts/AnthropicSans-Italic-Web.symbols.woff2",
      weight: "300 800",
      style: "italic",
      // @ts-ignore
      unicodeRange: "U+2000-27FF",
    },
  ],
  variable: "--font-anthropic-sans",
  display: "swap",
  preload: false,
});

const anthropicSerif = localFont({
  src: [
    // Roman (Normal)
    {
      path: "../public/fonts/AnthropicSerif-Roman-Web.latin.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+0020-007F",
    },
    {
      path: "../public/fonts/AnthropicSerif-Roman-Web.latin1.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+00A0-00FF",
    },
    {
      path: "../public/fonts/AnthropicSerif-Roman-Web.symbols.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+2000-27FF",
    },
    // Italic
    {
      path: "../public/fonts/AnthropicSerif-Italic-Web.latin.woff2",
      weight: "300 800",
      style: "italic",
      // @ts-ignore
      unicodeRange: "U+0020-007F",
    },
    {
      path: "../public/fonts/AnthropicSerif-Italic-Web.latin1.woff2",
      weight: "300 800",
      style: "italic",
      // @ts-ignore
      unicodeRange: "U+00A0-00FF",
    },
    {
      path: "../public/fonts/AnthropicSerif-Italic-Web.symbols.woff2",
      weight: "300 800",
      style: "italic",
      // @ts-ignore
      unicodeRange: "U+2000-27FF",
    },
  ],
  variable: "--font-anthropic-serif",
  display: "swap",
  preload: false,
});

const anthropicMono = localFont({
  src: [
    {
      path: "../public/fonts/AnthropicMono-Roman-Web.latin.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+0020-007F",
    },
    {
      path: "../public/fonts/AnthropicMono-Roman-Web.latin1.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+00A0-00FF",
    },
    {
      path: "../public/fonts/AnthropicMono-Roman-Web.symbols.woff2",
      weight: "300 800",
      style: "normal",
      // @ts-ignore
      unicodeRange: "U+2000-27FF",
    },
  ],
  variable: "--font-anthropic-mono",
  display: "swap",
  preload: false,
});
export const metadata: Metadata = {
  title: "Thineth Shehara",
  description: "Portfolio of Thineth Shehara (Shehara Nayanananda), Software Engineer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
  icons: {
    icon: [
      {
        url: "/logo.png",
        href: "/logo.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${anthropicSans.variable} ${anthropicSerif.variable} ${anthropicMono.variable}`}>
      <body className="min-h-full flex flex-col">
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
