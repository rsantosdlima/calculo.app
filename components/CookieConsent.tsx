"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          <p>
            Utilizamos cookies e dados de navegação para personalizar anúncios e melhorar sua experiência.
            Ao continuar navegando, você concorda com nossa
            <Link href="/privacidade" className="text-blue-400 hover:text-blue-300 ml-1 underline">
              Política de Privacidade
            </Link>.
          </p>
        </div>
        <button
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors whitespace-nowrap"
        >
          Aceitar e Fechar
        </button>
      </div>
    </div>
  );
}
