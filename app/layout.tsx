import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSense from "@/components/AdSense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculo.App.br - Simulações e Cálculos Online",
  description: "Faça cálculos trabalhistas, financeiros e datas de forma simples e rápida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000";

  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gray-50`}
      >
        {/* Load AdSense Script globally */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        <Header />

        {/* Main Layout with Ad placeholders */}
        <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Main Content Area */}
            <main className="lg:col-span-3">
              {children}
            </main>

            {/* Sidebar / Ad Space */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="bg-white p-4 rounded shadow mb-4">
                {/* Sidebar Ad Slot */}
                <AdSense
                  slot="1234567890"
                  format="auto"
                  style={{ minHeight: '250px' }}
                />
              </div>
              <div className="bg-white p-4 rounded shadow">
                 <h3 className="font-bold text-gray-700 mb-2">Mais acessados</h3>
                 <ul className="text-sm space-y-2 text-blue-600">
                    <li><a href="#">Cálculo de Rescisão</a></li>
                    <li><a href="#">Correção Monetária</a></li>
                 </ul>
              </div>
            </aside>
          </div>
        </div>

        <Footer />
      </body>
    </html>
  );
}
