import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayush Mishra | AI/ML Engineer & Full-Stack Developer",
  description:
    "Portfolio of Ayush Mishra — AI/ML Engineer, Full-Stack Developer & Creative Technologist. Building intelligent systems with PyTorch, NLP, and modern web technologies.",
  keywords: [
    "Ayush Mishra",
    "AI Engineer",
    "ML Engineer",
    "Full-Stack Developer",
    "Portfolio",
    "PyTorch",
    "NLP",
    "Computer Vision",
    "Next.js",
    "React",
    "NeuroWell",
  ],
  authors: [{ name: "Ayush Mishra" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayushmishra.dev",
    title: "Ayush Mishra | AI/ML Engineer & Full-Stack Developer",
    description:
      "Building intelligent systems with AI, NLP, and modern web technologies.",
    siteName: "Ayush Mishra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Mishra | AI/ML Engineer",
    description:
      "Building intelligent systems with AI, NLP, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ayush Mishra",
              jobTitle: "AI/ML Engineer & Full-Stack Developer",
              url: "https://ayushmishra.dev",
              sameAs: [
                "https://github.com/Ayush120704",
                "https://leetcode.com/u/ayushmishra12345/",
              ],
              email: "aayumishra2024@gmail.com",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
