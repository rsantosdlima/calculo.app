"use client";

import { useState, useEffect } from "react";

interface ExchangeRate {
  symbol: string;
  cotacaoCompra: number;
  cotacaoVenda: number;
  dataHoraCotacao: string;
}

// Lista de Moedas Suportadas pelo BCB (Principais)
const CURRENCIES = [
  { symbol: "USD", name: "Dólar Americano", flag: "🇺🇸" },
  { symbol: "EUR", name: "Euro", flag: "🇪🇺" },
  { symbol: "GBP", name: "Libra Esterlina", flag: "🇬🇧" },
  { symbol: "CAD", name: "Dólar Canadense", flag: "🇨🇦" },
  { symbol: "AUD", name: "Dólar Australiano", flag: "🇦🇺" },
  { symbol: "JPY", name: "Iene Japonês", flag: "🇯🇵" },
  { symbol: "CHF", name: "Franco Suíço", flag: "🇨🇭" },
];

export default function CurrencyConverter() {
  const [amountStr, setAmountStr] = useState("1,00");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [direction, setDirection] = useState<"foreign_to_brl" | "brl_to_foreign">("foreign_to_brl");
  
  const [rate, setRate] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const formatCurrency = (val: number, currency: string) => {
    // Ajuste para Iene que tem valor muito baixo, mostrar mais casas se precisar, ou padrão 2
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(val);
  };

  // Busca a cotação sempre que a moeda mudar
  useEffect(() => {
    async function fetchRate() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/bcb-rate?currency=${selectedCurrency}`);
        if (!res.ok) throw new Error("Falha na API");
        const data = await res.json();
        setRate(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchRate();
  }, [selectedCurrency]);

  const amount = parseFloat(amountStr.replace(/\./g, "").replace(",", ".")) || 0;
  let result = 0;

  if (rate) {
    if (direction === "foreign_to_brl") {
      // Moeda Estrangeira -> Real (Usa Venda PTAX como referência de mercado)
      result = amount * rate.cotacaoVenda;
    } else {
      // Real -> Moeda Estrangeira
      result = amount / rate.cotacaoVenda;
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Conversor Oficial (PTAX)</h2>
        <p className="text-gray-500 text-sm mt-1">
          Cotações oficiais de fechamento do Banco Central.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Seletor de Moeda */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Escolha a Moeda</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CURRENCIES.map((c) => (
              <button
                key={c.symbol}
                onClick={() => setSelectedCurrency(c.symbol)}
                className={`flex items-center justify-center p-2 rounded-lg border transition-all ${
                  selectedCurrency === c.symbol
                    ? "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2 text-lg">{c.flag}</span>
                {c.symbol}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="animate-pulse h-24 bg-gray-100 rounded-lg"></div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
            Cotação não disponível no momento.
          </div>
        ) : rate ? (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 animate-in fade-in">
            <div className="flex flex-col md:flex-row items-end gap-4">
              
              {/* Input Valor */}
              <div className="w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Valor em {direction === "foreign_to_brl" ? rate.symbol : "Real (BRL)"}
                </label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900 text-xl font-bold"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                />
              </div>

              {/* Botão Inverter */}
              <div className="flex justify-center pb-2">
                <button 
                  onClick={() => setDirection(direction === "foreign_to_brl" ? "brl_to_foreign" : "foreign_to_brl")}
                  className="p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-100 hover:border-emerald-400 transition-all text-gray-600 shadow-sm"
                  title="Inverter conversão"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                </button>
              </div>

              {/* Resultado */}
              <div className="w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Equivale a em {direction === "foreign_to_brl" ? "Real (BRL)" : rate.symbol}
                </label>
                <div className="w-full bg-emerald-600 rounded-md p-3 text-white text-xl font-extrabold shadow-md border border-emerald-700">
                   {formatCurrency(result, direction === "foreign_to_brl" ? "BRL" : rate.symbol)}
                </div>
              </div>

            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
              <span><strong>1 {rate.symbol}</strong> = {formatCurrency(rate.cotacaoVenda, "BRL")}</span>
              <span>Atualizado: {new Date(rate.dataHoraCotacao).toLocaleDateString("pt-BR")}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}