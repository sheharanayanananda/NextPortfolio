import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AnalyticsTracker from "./components/AnalyticsTracker";
import CopyEmailToast from "./components/CopyEmailToast";

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
  preload: true,
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
  preload: true,
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
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Thineth",
    template: "%s | Thineth",
  },
  description: "Portfolio of Thineth Shehara (Shei). Building fast mobile apps, reliable real-time backends, and simple web tools in Tampere, Finland.",
  metadataBase: new URL("https://shehara.dayzsolutions.com"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Thineth Shehara (Shei)",
    description: "Portfolio of Thineth Shehara (Shei), Software Developer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
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
    title: "Thineth Shehara (Shei)",
    description: "Portfolio of Thineth Shehara (Shei), Software Developer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
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
    types: {
      "text/markdown": [
        { url: "https://shehara.dayzsolutions.com/llms.txt", title: "LLM Summary" },
        { url: "https://shehara.dayzsolutions.com/llms-full.txt", title: "LLM Full Content" },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${anthropicSans.variable} ${anthropicSerif.variable} ${anthropicMono.variable}`}>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Summary" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="LLM Full Content" />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfilePage",
                  "@id": "https://shehara.dayzsolutions.com/#profilepage",
                  "url": "https://shehara.dayzsolutions.com",
                  "name": "Thineth Shehara (Shei) Portfolio & Developer Profile",
                  "mainEntity": {
                    "@id": "https://shehara.dayzsolutions.com/#person"
                  }
                },
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
                  "alternateName": ["Shei", "Thineth", "Shehara Nayanananda", "Thineth Shehara Nayanananda"],
                  "publisher": {
                    "@id": "https://shehara.dayzsolutions.com/#organization"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://shehara.dayzsolutions.com/#person",
                  "name": "Thineth Shehara",
                  "alternateName": ["Shei", "Thineth", "Shehara Nayanananda"],
                  "url": "https://shehara.dayzsolutions.com",
                  "image": "https://shehara.dayzsolutions.com/me.jpg",
                  "description": "Software Developer specializing in mobile applications, real-time WebSocket systems, high-volume inventory sync, and turning fragile codebases into reliable, production-ready products.",
                  "knowsAbout": [
                    "Software Engineering",
                    "Flutter",
                    "Dart",
                    "Swift",
                    "SwiftUI",
                    "Next.js",
                    "React",
                    "Laravel",
                    "PHP",
                    "Python",
                    "WebSockets",
                    "MySQL",
                    "PostgreSQL",
                    "Meilisearch",
                    "REST APIs"
                  ],
                  "sameAs": [
                    "https://linkedin.com/in/thineth-nayanananda-54815b228/",
                    "https://github.com/sheharanayanananda",
                    "mailto:sheharanayanananda@gmail.com"
                  ],
                  "jobTitle": "Software Engineer",
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Independent / Associate Software Engineer"
                  },
                  "alumniOf": [
                    {
                      "@type": "EducationalOrganization",
                      "name": "Tampere University of Applied Sciences (TAMK)",
                      "url": "https://www.tuni.fi/en/about-us/tamk"
                    },
                    {
                      "@type": "EducationalOrganization",
                      "name": "ESOFT Metro Campus"
                    }
                  ],
                  "hasCredential": [
                    {
                      "@type": "EducationalOccupationalCredential",
                      "name": "Bachelor of Engineering in Software Engineering (B.Eng)",
                      "credentialCategory": "degree",
                      "educationalLevel": "EQF Level 6 / 240 ECTS",
                      "recognizedBy": {
                        "@type": "EducationalOrganization",
                        "name": "Tampere University of Applied Sciences (TAMK)"
                      }
                    },
                    {
                      "@type": "EducationalOccupationalCredential",
                      "name": "Pearson BTEC Level 5 Higher National Diploma in Computing",
                      "credentialCategory": "diploma",
                      "educationalLevel": "UK RQF Level 5 / 240 Credits",
                      "recognizedBy": {
                        "@type": "EducationalOrganization",
                        "name": "Pearson Education Ltd."
                      }
                    }
                  ]
                },
                {
                  "@type": "ItemList",
                  "@id": "https://shehara.dayzsolutions.com/#projects",
                  "name": "Featured Software Projects",
                  "itemListElement": [
                    {
                      "@type": "SoftwareApplication",
                      "name": "Slate Agentic & Slate Origin",
                      "operatingSystem": "iOS 17+",
                      "applicationCategory": "ProductivityApplication",
                      "description": "Intelligent notes app for iPhone built with SwiftUI, featuring cloud LLM streaming, GenUI widgets, live LaTeX rendering, and SwiftData persistence.",
                      "url": "https://shehara.dayzsolutions.com/slate",
                      "sameAs": "https://github.com/sheharanayanananda/Slate"
                    },
                    {
                      "@type": "SoftwareApplication",
                      "name": "UNiFY Sports Platform",
                      "operatingSystem": "iOS, Android, Cloud",
                      "applicationCategory": "SportsApplication",
                      "description": "Cross-platform sports platform built with Flutter and Python/Flask backend, featuring real-time WebSockets scoreboards and NFC payments via Stripe.",
                      "sameAs": "https://github.com/sheharanayanananda"
                    },
                    {
                      "@type": "SoftwareApplication",
                      "name": "Deurbeslag Gigant Central Inventory ERP",
                      "operatingSystem": "Web, Linux Server",
                      "applicationCategory": "BusinessApplication",
                      "description": "Laravel centralized inventory and order management system synchronizing 50,000+ products across WooCommerce storefronts and Bol.com API with Meilisearch.",
                      "url": "https://shehara.dayzsolutions.com"
                    }
                  ]
                }
              ]
            })
          }}
        />
        <AnalyticsTracker />
        <CopyEmailToast />
        {children}
      </body>
    </html>
  );
}
