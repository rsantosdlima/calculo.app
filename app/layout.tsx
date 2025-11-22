import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";
import CookieConsent from "@/components/CookieConsent";
import Link from "next/link";

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
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-center">
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

              {/* Links Rápidos */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-xl mr-2">🔥</span> Destaques
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="pb-3 border-b border-gray-50">
                    <Link
                      href="/calculadora-irrf-2026"
                      className="group flex flex-col"
                      title="Simulação da nova tabela do IR 2026"
                    >
                      <span className="font-bold text-blue-700 group-hover:underline">
                        Simulação IRRF 2026 (PL)
                      </span>
                      <span className="text-gray-500 text-xs mt-1">
                        Nova isenção e redução
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-salario-liquido"
                      className="text-gray-700 hover:text-blue-600 hover:underline block py-1"
                    >
                      Salário Líquido 2025
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tabelas-inss-irpf"
                      className="text-gray-700 hover:text-blue-600 hover:underline block py-1"
                    >
                      Tabelas INSS e IRPF
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>

        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}