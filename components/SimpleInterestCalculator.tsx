"use client";

import { useState } from "react";
// CORREÇÃO IMPORTANTE: Importando o nome exato que definimos na lib
import { calculateSimpleInterest, SimpleInterestResult } from "@/lib/interest-calculations";

export default function SimpleInterestCalculator() {
  // Estados para os valores digitados (strings)
  const [principalStr, setPrincipalStr] = useState("");
  const [rateStr, setRateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  // Estados para os seletores de período (tipos específicos de string)
  const [ratePeriod, setRatePeriod] = useState<"monthly" | "yearly">("monthly");
  const [timePeriod, setTimePeriod] = useState<"months" | "years">("months");

  // Estado para o resultado, usando a interface correta
  const [result, setResult] = useState<SimpleInterestResult | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Tratamento para converter string monetária (PT-BR) para número (float)
    // Remove pontos de milhar e troca vírgula decimal por ponto
    const principal = parseFloat(principalStr.replace(/\./g, "").replace(",", "."));
    const rate = parseFloat(rateStr.replace(",", "."));
    const time = parseFloat(timeStr);

    // Validação básica
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert("Por favor, preencha os campos com valores numéricos válidos.");
        return;
    }

    // Chamada da função. Como os tipos de ratePeriod e timePeriod agora batem
    // com o que a função na lib espera (strings), o erro deve sumir.
    const res = calculateSimpleInterest(principal, rate, time, ratePeriod, timePeriod);
    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 my-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Simulador de Rendimento</h2>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Valor Principal */}
          <div className="md:col-span-2">
            <label htmlFor="si-principal" className="block text-sm font-medium text-gray-700 mb-1">Valor Principal (R$)</label>
            <input
              type="text"
              id="si-principal"
              required
              placeholder="Ex: 1.000,00"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              value={principalStr}
              onChange={(e) => setPrincipalStr(e.target.value)}
            />
          </div>

          {/* Taxa de Juros */}
          <div>
            <label htmlFor="si-rate" className="block text-sm font-medium text-gray-700 mb-1">Taxa de Juros (%)</label>
            <div className="flex">
                <input
                type="text"
                id="si-rate"
                required
                placeholder="Ex: 1,5"
                className="w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                value={rateStr}
                onChange={(e) => setRateStr(e.target.value)}
                />
                <select
                    className="rounded-r-md border-gray-300 border-l-0 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={ratePeriod}
                    onChange={(e) => setRatePeriod(e.target.value as "monthly" | "yearly")}
                >
                    <option value="monthly">% ao mês</option>
                    <option value="yearly">% ao ano</option>
                </select>
            </div>
          </div>

          {/* Período (Tempo) */}
          <div>
            <label htmlFor="si-time" className="block text-sm font-medium text-gray-700 mb-1">Período</label>
            <div className="flex">
                <input
                type="number"
                id="si-time"
                required
                placeholder="Ex: 12"
                className="w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
                />
                <select
                    className="rounded-r-md border-gray-300 border-l-0 bg-gray-50 p-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value as "months" | "years")}
                >
                    <option value="months">Meses</option>
                    <option value="years">Anos</option>
                </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-md"
        >
          Calcular Juros
        </button>
      </form>

      {/* Resultado */}
      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 animate-in fade-in duration-300 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Resultado da Simulação</h3>
          
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Valor Investido</dt>
                <dd className="mt-1 text-lg text-gray-900">{formatCurrency(result.principal)}</dd>
            </div>
            <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Total de Juros</dt>
                <dd className="mt-1 text-lg font-bold text-green-600">+{formatCurrency(result.totalInterest)}</dd>
            </div>
          </dl>

          <div className="mt-6 bg-white p-4 rounded-lg border border-blue-100 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
            <span className="text-lg font-bold text-gray-700 uppercase tracking-wide mb-2 sm:mb-0">Montante Final (Total)</span>
            <span className="text-3xl font-extrabold text-blue-600">{formatCurrency(result.totalAmount)}</span>
          </div>
        </div>
      )}
    </div>
  );
}