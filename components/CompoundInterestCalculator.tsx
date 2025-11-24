"use client";

import { useState } from "react";
import { calculateCompoundInterest, CompoundInterestResult } from "@/lib/compound-interest";

export default function CompoundInterestCalculator() {
  // Estados
  const [initialStr, setInitialStr] = useState("1000,00");
  const [monthlyStr, setMonthlyStr] = useState("500,00");
  const [rateStr, setRateStr] = useState("10,0"); // Ex: 10% ao ano (CDI/Selic média)
  const [ratePeriod, setRatePeriod] = useState<"monthly" | "yearly">("yearly");
  const [timeStr, setTimeStr] = useState("5");
  const [timePeriod, setTimePeriod] = useState<"months" | "years">("years");

  const [result, setResult] = useState<CompoundInterestResult | null>(null);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const initial = parseFloat(initialStr.replace(/\./g, "").replace(",", ".")) || 0;
    const monthly = parseFloat(monthlyStr.replace(/\./g, "").replace(",", ".")) || 0;
    const rate = parseFloat(rateStr.replace(",", ".")) || 0;
    const time = parseFloat(timeStr) || 0;

    if (time <= 0) {
      alert("Informe um período de tempo válido.");
      return;
    }

    const res = calculateCompoundInterest({
      initialValue: initial,
      monthlyValue: monthly,
      interestRate: rate,
      ratePeriod,
      periodValue: time,
      periodType: timePeriod
    });

    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 my-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Simulador de Juros Compostos</h2>
        <p className="text-gray-500 text-sm">Veja o poder do tempo e dos juros sobre o seu dinheiro.</p>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor Inicial */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Valor Inicial (R$)</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900 text-lg"
              value={initialStr}
              onChange={(e) => setInitialStr(e.target.value)}
            />
          </div>

          {/* Aporte Mensal */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Aporte Mensal (R$)</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900 text-lg"
              value={monthlyStr}
              onChange={(e) => setMonthlyStr(e.target.value)}
            />
          </div>

          {/* Taxa de Juros */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Taxa de Juros (%)</label>
            <div className="flex">
              <input
                type="text"
                className="w-full border-gray-300 rounded-l-md p-3 bg-white text-gray-900 text-lg"
                value={rateStr}
                onChange={(e) => setRateStr(e.target.value)}
              />
              <select
                className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 text-gray-700 text-sm font-medium"
                value={ratePeriod}
                onChange={(e) => setRatePeriod(e.target.value as "monthly" | "yearly")}
              >
                <option value="yearly">ao ano</option>
                <option value="monthly">ao mês</option>
              </select>
            </div>
          </div>

          {/* Período */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Período (Tempo)</label>
            <div className="flex">
              <input
                type="number"
                min="1"
                className="w-full border-gray-300 rounded-l-md p-3 bg-white text-gray-900 text-lg"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
              />
              <select
                className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 text-gray-700 text-sm font-medium"
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value as "months" | "years")}
              >
                <option value="years">anos</option>
                <option value="months">meses</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition-all shadow-md text-lg"
        >
          Calcular Futuro
        </button>
      </form>

      {/* Resultados */}
      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
              <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Investido</p>
              <p className="text-xl font-bold text-gray-800">{formatCurrency(result.totalInvested)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-green-700 uppercase font-bold mb-1">Total em Juros</p>
              <p className="text-xl font-bold text-green-600">+{formatCurrency(result.totalInterest)}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-center md:col-span-1 col-span-1">
              <p className="text-xs text-indigo-700 uppercase font-bold mb-1">Valor Total Final</p>
              <p className="text-2xl font-extrabold text-indigo-700">{formatCurrency(result.totalAmount)}</p>
            </div>
          </div>

          {/* Tabela de Evolução */}
          {result.yearlyBreakdown.length > 0 && (
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full text-sm text-right">
                <thead className="bg-gray-100 text-gray-600 font-bold">
                  <tr>
                    <th className="px-4 py-3 text-left">Tempo</th>
                    <th className="px-4 py-3">Investido</th>
                    <th className="px-4 py-3">Juros</th>
                    <th className="px-4 py-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {result.yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-left text-gray-900 font-medium">{row.year}º Ano</td>
                      <td className="px-4 py-3 text-gray-600">{formatCurrency(row.invested)}</td>
                      <td className="px-4 py-3 text-green-600">+{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-3 text-indigo-700 font-bold">{formatCurrency(row.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}