"use client";

import { useState } from "react";
import { calculateFinancing, FinancingResult } from "@/lib/financing-calculations";

export default function FinancingCalculator() {
  const [amountStr, setAmountStr] = useState("200.000,00");
  const [rateStr, setRateStr] = useState("10,5"); // Taxa anual comum imobiliária
  const [yearsStr, setYearsStr] = useState("30");
  const [system, setSystem] = useState<"SAC" | "PRICE">("SAC");
  
  const [result, setResult] = useState<FinancingResult | null>(null);
  const [showTable, setShowTable] = useState(false);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountStr.replace(/\./g, "").replace(",", ".")) || 0;
    const rate = parseFloat(rateStr.replace(",", ".")) || 0;
    const years = parseFloat(yearsStr) || 0;

    if (amount <= 0 || rate <= 0 || years <= 0) {
      alert("Por favor, preencha todos os campos com valores válidos.");
      return;
    }

    const res = calculateFinancing({
      loanAmount: amount,
      annualRate: rate,
      totalMonths: years * 12,
      system,
    });

    setResult(res);
    setShowTable(false); // Reseta tabela ao recalcular
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Simulador de Financiamento</h2>
      
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor do Financiamento */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Valor a Financiar (R$)</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900 text-lg"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </div>

          {/* Taxa de Juros */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Taxa de Juros (% ao ano)</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              placeholder="Ex: 9.5"
              value={rateStr}
              onChange={(e) => setRateStr(e.target.value)}
            />
          </div>

          {/* Prazo */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Prazo (Anos)</label>
            <input
              type="number"
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              placeholder="Ex: 30"
              value={yearsStr}
              onChange={(e) => setYearsStr(e.target.value)}
            />
          </div>

          {/* Sistema de Amortização */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-3">Sistema de Amortização</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSystem("SAC")}
                className={`p-4 rounded-lg border text-center transition-all ${
                  system === "SAC" 
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500" 
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="block font-bold text-lg">SAC</span>
                <span className="text-xs">Parcelas decrescentes</span>
              </button>
              <button
                type="button"
                onClick={() => setSystem("PRICE")}
                className={`p-4 rounded-lg border text-center transition-all ${
                  system === "PRICE" 
                    ? "bg-indigo-50 border-indigo-500 text-indigo-700 ring-1 ring-indigo-500" 
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="block font-bold text-lg">Price</span>
                <span className="text-xs">Parcelas fixas</span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition-all shadow-md text-lg"
        >
          Simular Financiamento
        </button>
      </form>

      {/* Resultados */}
      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gray-900 text-white p-6 rounded-t-xl">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Primeira Parcela</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-green-400">{formatCurrency(result.firstInstallment)}</span>
            </div>
            {system === "SAC" && (
              <p className="text-sm text-gray-400 mt-2">
                Última parcela estimada: <span className="text-white font-bold">{formatCurrency(result.lastInstallment)}</span>
              </p>
            )}
          </div>

          <div className="border border-gray-200 border-t-0 rounded-b-xl p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Total Financiado</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(result.totalAmortization)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Total de Juros</p>
                <p className="text-lg font-semibold text-red-600">{formatCurrency(result.totalInterest)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Custo Total</p>
                <p className="text-lg font-bold text-indigo-700">{formatCurrency(result.totalPaid)}</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setShowTable(!showTable)}
                className="text-indigo-600 font-medium hover:text-indigo-800 text-sm flex items-center justify-center mx-auto"
              >
                {showTable ? "Ocultar Tabela Detalhada" : "Ver Tabela de Parcelas"}
                <svg className={`w-4 h-4 ml-1 transition-transform ${showTable ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tabela Expansível */}
          {showTable && (
            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden overflow-x-auto bg-white animate-in fade-in">
              <table className="min-w-full text-sm text-right">
                <thead className="bg-gray-100 text-gray-600 font-bold">
                  <tr>
                    <th className="px-4 py-2 text-center">#</th>
                    <th className="px-4 py-2">Parcela</th>
                    <th className="px-4 py-2">Amortização</th>
                    <th className="px-4 py-2">Juros</th>
                    <th className="px-4 py-2">Saldo Devedor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {result.installments.map((row) => (
                    <tr key={row.number} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-center text-gray-500">{row.number}</td>
                      <td className="px-4 py-2 font-bold text-gray-900">{formatCurrency(row.payment)}</td>
                      <td className="px-4 py-2 text-blue-600">{formatCurrency(row.amortization)}</td>
                      <td className="px-4 py-2 text-red-500">{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-2 text-gray-500">{formatCurrency(row.balance)}</td>
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