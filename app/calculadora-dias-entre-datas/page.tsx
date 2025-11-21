"use client";

import { useState } from "react";
import { calculateDateDiff } from "@/lib/date-calculations";

export default function DateDiffCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<{ totalDays: number; years: number; months: number; days: number } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateDateDiff(startDate, endDate);
    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Dias entre Datas</h1>

      <form onSubmit={handleCalculate} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Data Inicial</label>
                <input
                    type="date"
                    id="startDate"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Data Final</label>
                <input
                    type="date"
                    id="endDate"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-lg"
        >
          Calcular Intervalo
        </button>
      </form>

      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Resultado</h2>

          <div className="text-center">
            <p className="text-gray-500 text-sm uppercase tracking-wide">Total de Dias</p>
            <p className="text-4xl font-bold text-blue-600 mb-4">{result.totalDays} dias</p>
          </div>

          <div className="bg-white p-4 rounded border border-gray-100 text-center">
            <p className="text-gray-600 font-medium mb-2">Detalhamento</p>
            <p className="text-lg text-gray-800">
                {result.years > 0 && <span>{result.years} anos, </span>}
                {result.months > 0 && <span>{result.months} meses e </span>}
                <span>{result.days} dias</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
