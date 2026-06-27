import type { Metadata } from "next";
import { Newsreader, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Thineth Shehara — Software Engineer",
  description: "Portfolio of Thineth Shehara (Shehara Nayanananda), Software Engineer studying Software Engineering at Tampere University of Applied Sciences (TAMK), Finland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}


