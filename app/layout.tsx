import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anthropicSans = localFont({
  src: [
    {
      path: "../public/fonts/AnthropicSans-Roman-Web.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../public/fonts/AnthropicSans-Italic-Web.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
  variable: "--font-anthropic-sans",
  display: "swap",
});

const anthropicSerif = localFont({
  src: [
    {
      path: "../public/fonts/AnthropicSerif-Roman-Web.woff2",
      weight: "300 800",
      style: "normal",
    },
    {
      path: "../public/fonts/AnthropicSerif-Italic-Web.woff2",
      weight: "300 800",
      style: "italic",
    },
  ],
  variable: "--font-anthropic-serif",
  display: "swap",
});

const anthropicMono = localFont({
  src: [
    {
      path: "../public/fonts/AnthropicMono-Roman-Web.woff2",
      weight: "300 800",
      style: "normal",
    },
  ],
  variable: "--font-anthropic-mono",
  display: "swap",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
