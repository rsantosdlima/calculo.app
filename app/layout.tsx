// CAMINHO: app/layout.tsx

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

// --- NOVA ADIÇÃO: Força o navegador a entender que o site é CLARO ---
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};
// ------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Calculo.App - Simulações e Cálculos Online",
  description:
    "Faça cálculos trabalhistas, financeiros e datas de forma simples e rápida.",
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
  const adsenseId =
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000";

  return (
    <html lang="pt-BR">
      <body
        // Adicionei 'bg-white' e 'text-gray-900' aqui na tag body também para garantir
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900`}
      >
        {/* Load AdSense Script globally */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Header />

        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <main className="lg:col-span-3">{children}</main>

            <aside className="hidden lg:block lg:col-span-1">
              <div className="bg-white p-4 rounded shadow mb-4 border border-gray-100">
                {/* ID REAL DO ADSENSE VERTICAL */}
                <AdSense
                  slot="3207121991"
                  format="auto"
                  style={{ minHeight: "250px" }}
                />
              </div>
              <div className="bg-white p-4 rounded shadow border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3">
                  Calculadoras Populares
                </h3>
                <ul className="text-sm space-y-3">
                  <li className="pb-2 border-b border-gray-100">
                    <Link
                      href="/calculadora-irrf-2026"
                      className="hover:underline font-bold text-blue-700 flex items-center gap-2"
                      title="Simulação da nova tabela do IR 2026"
                    >
                      <span className="text-lg">⭐</span> Simulação IRRF 2026
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-salario-liquido"
                      className="text-blue-600 hover:underline block py-1"
                      title="Ir para Calculadora de Salário Líquido"
                    >
                      Salário Líquido 2025
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/calculadora-horas-extras"
                      className="text-blue-600 hover:underline block py-1"
                      title="Ir para Calculadora de Horas Extras"
                    >
                      Horas Extras
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