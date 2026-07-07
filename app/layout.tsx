import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thineth Shehara",
  description:
    "Portfolio of Thineth Shehara (Shehara Nayanananda), Software Engineer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
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
    <html lang="en" className="h-full scroll-smooth">
      <head>
        {/* Preload the 3 roman font faces used for above-the-fold text.
            Italic variants are deferred — they only appear on hover/interaction. */}
        <link
          rel="preload"
          href="/fonts/AnthropicSans-Roman-Web.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AnthropicSerif-Roman-Web.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AnthropicMono-Roman-Web.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
