import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayush Mishra | AI/ML Engineer & Full-Stack Developer",
  description:
    "Ayush Mishra — AI/ML Engineer, Full-Stack Developer & Creative Technologist. Building intelligent systems with PyTorch, NLP, and modern web technologies.",
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
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="custom-cursor-active">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
