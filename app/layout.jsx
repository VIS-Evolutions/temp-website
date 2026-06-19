import "./globals.css";
import { s } from "@/lib/style";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealController from "@/components/RevealController";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  title: "VIS Evolutions · F1 in Schools STEM Racing Team",
  description:
    "VIS Evolutions is a student STEM racing team competing in the F1 in Schools challenge — designing, building and racing a miniature Formula 1 car.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Public+Sans:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
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
