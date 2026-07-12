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
  title: {
    default: "Thineth Shehara",
    template: "%s | Thineth Shehara",
  },
  description: "Portfolio of Thineth Shehara (Shehara Nayanananda), Software Engineer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
  metadataBase: new URL("https://shehara.dayzsolutions.com"),
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" }
    ],
  },
  openGraph: {
    title: "Thineth Shehara",
    description: "Portfolio of Thineth Shehara (Shehara Nayanananda), Software Engineer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
    url: "https://shehara.dayzsolutions.com",
    siteName: "Thineth Shehara",
    images: [
      {
        url: "/me.jpg",
        width: 800,
        height: 800,
        alt: "Thineth Shehara Portrait",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thineth Shehara",
    description: "Portfolio of Thineth Shehara (Shehara Nayanananda), Software Engineer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
    images: ["/me.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://shehara.dayzsolutions.com",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://shehara.dayzsolutions.com/#organization",
                  "name": "Thineth Shehara",
                  "url": "https://shehara.dayzsolutions.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://shehara.dayzsolutions.com/logo.png",
                    "width": 512,
                    "height": 512
                  },
                  "sameAs": [
                    "https://linkedin.com/in/thineth-nayanananda-54815b228/",
                    "https://github.com/sheharanayanananda"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://shehara.dayzsolutions.com/#website",
                  "url": "https://shehara.dayzsolutions.com",
                  "name": "Thineth Shehara",
                  "alternateName": ["Shehara Nayanananda", "Thineth Shehara Nayanananda"],
                  "publisher": {
                    "@id": "https://shehara.dayzsolutions.com/#organization"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://shehara.dayzsolutions.com/#person",
                  "name": "Thineth Shehara",
                  "alternateName": "Shehara Nayanananda",
                  "url": "https://shehara.dayzsolutions.com",
                  "image": "https://shehara.dayzsolutions.com/me.jpg",
                  "description": "Software Engineer specializing in mobile applications, fluid animations, modular systems, and robust offline architectures.",
                  "sameAs": [
                    "https://linkedin.com/in/thineth-nayanananda-54815b228/",
                    "https://github.com/sheharanayanananda",
                    "mailto:sheharanayanananda@gmail.com"
                  ],
                  "jobTitle": "Software Engineer",
                  "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "Tampere University of Applied Sciences (TAMK)"
                  }
                }
              ]
            })
          }}
        />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
