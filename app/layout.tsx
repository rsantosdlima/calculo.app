import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";
import CookieConsent from "@/components/CookieConsent";
import SidebarHighlights from "@/components/SidebarHighlights";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- Viewport Configuration ---
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  title: "Calculo.App - Simulações e Cálculos Online",
  description:
    "Faça cálculos trabalhistas, financeiros e datas de forma simples e rápida. Simuladores de Salário Líquido, Férias, Rescisão e muito mais.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // IDs do AdSense e Google Analytics via variáveis de ambiente
  const adsenseId =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000";
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900 font-sans`}
      >
        {/* --- SCRIPTS GLOBAIS (AdSense e Analytics) --- */}

        {/* 1. Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* 2. Google Analytics (GA4) - Só carrega se o ID existir */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}

        <Header />

        {/* Layout Principal com Sidebar */}
        <div className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Área de Conteúdo Principal */}
            <main className="lg:col-span-3">{children}</main>

            {/* Barra Lateral (Sidebar) */}
            <aside className="hidden lg:block lg:col-span-1 space-y-6">
              {/* Bloco de Anúncio Vertical */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <AdSense
                  slot="3207121991" // Seu ID de slot vertical real
                  format="auto"
                  style={{
                    display: "block",
                    minHeight: "250px",
                    width: "100%",
                  }}
                />
              </div>

              {/* Links Rápidos Dinâmicos */}
              <SidebarHighlights />
            </aside>
          </div>
        </div>

        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}