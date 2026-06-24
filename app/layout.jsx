import "./globals.css";
import { s } from "@/lib/style";
import { SITE } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.defaultTitle,
  description: SITE.description,
  applicationName: SITE.name,
  keywords: SITE.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: SITE.defaultTitle,
    description: SITE.description,
    locale: "en_GB",
    images: [{ url: SITE.ogImage, width: 590, height: 505, alt: "VIS Evolutions — F1 in Schools STEM Racing Team" }],
  },
  twitter: {
    card: "summary",
    title: SITE.defaultTitle,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  category: "education",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: SITE.name,
  alternateName: SITE.alternateNames,
  description: SITE.description,
  sport: "F1 in Schools — STEM Racing",
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}/logo.png`,
  email: SITE.email,
  sameAs: SITE.social,
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  alternateName: SITE.alternateNames,
  url: SITE.url,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Public+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
      </head>
      <body>
        <div style={s("min-height:100vh;background:#FAFAF8;font-family:'Public Sans',system-ui,sans-serif;color:#232220;-webkit-font-smoothing:antialiased;overflow-x:hidden")}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <RevealController revealOnScroll={true} />
      </body>
    </html>
  );
}
