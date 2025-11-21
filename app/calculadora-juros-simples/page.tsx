"use client";

import { useState } from "react";
import { calculateSimpleInterest, InterestResult, RateUnit, TimeUnit } from "@/lib/interest-calculations";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [rateUnit, setRateUnit] = useState(RateUnit.MONTHLY);
  const [time, setTime] = useState("");
  const [timeUnit, setTimeUnit] = useState(TimeUnit.MONTHS);

  const [result, setResult] = useState<InterestResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    const res = calculateSimpleInterest(p, r, rateUnit, t, timeUnit);
    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Juros Simples</h1>

      <form onSubmit={handleCalculate} className="space-y-6 mb-8">

        <div>
            <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-1">Valor Inicial (Capital) R$</label>
            <input
                type="number"
                id="principal"
                required
                step="0.01"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                placeholder="Ex: 1000.00"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">Taxa de Juros (%)</label>
                <div className="flex">
                    <input
                        type="number"
                        id="rate"
                        required
                        step="0.01"
                        className="w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        placeholder="Ex: 1"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                    />
                    <select
                        className="bg-gray-50 border border-l-0 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        value={rateUnit}
                        onChange={(e) => setRateUnit(parseInt(e.target.value))}
                    >
                        <option value={RateUnit.MONTHLY}>ao mês</option>
                        <option value={RateUnit.YEARLY}>ao ano</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Período (Prazo)</label>
                <div className="flex">
                    <input
                        type="number"
                        id="time"
                        required
                        step="1"
                        className="w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                        placeholder="Ex: 12"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                     <select
                        className="bg-gray-50 border border-l-0 border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(parseInt(e.target.value))}
                    >
                        <option value={TimeUnit.MONTHS}>meses</option>
                        <option value={TimeUnit.YEARS}>anos</option>
                    </select>
                </div>
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-lg"
        >
          Calcular Juros
        </button>
      </form>

      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Resultado</h2>

          <div className="flex justify-between text-gray-600">
            <span>Valor Inicial</span>
            <span className="font-medium">R$ {result.principal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-blue-600">
            <span>Total em Juros</span>
            <span>+ R$ {result.interestAmount.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-300 pt-3 mt-2 flex justify-between text-xl font-bold text-green-700">
            <span>Valor Total Final</span>
            <span>R$ {result.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
