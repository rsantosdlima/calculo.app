"use client";

import { useState } from "react";
import { calculateDateOperation, DateOperationResult } from "@/lib/date-utilities";

export default function DateAdderCalculator() {
  const [startDate, setStartDate] = useState("");
  const [amount, setAmount] = useState("30");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [type, setType] = useState<"days" | "weeks" | "months" | "years">("days");
  
  const [result, setResult] = useState<DateOperationResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !amount) return;

    const res = calculateDateOperation(
      startDate, 
      parseInt(amount), 
      operation, 
      type
    );
    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Somar ou Subtrair Datas</h2>
      
      <form onSubmit={handleCalculate} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Data Inicial</label>
            <input 
              type="date" required
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={startDate} onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Operação</label>
            <select 
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={operation} onChange={(e) => setOperation(e.target.value as any)}>
              <option value="add">Somar (+)</option>
              <option value="subtract">Subtrair (-)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Quantidade</label>
            <input 
              type="number" required min="1"
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={amount} onChange={(e) => setAmount(e.target.value)} 
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-bold text-gray-700 mb-2">Unidade</label>
            <select 
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={type} onChange={(e) => setType(e.target.value as any)}>
              <option value="days">Dias</option>
              <option value="weeks">Semanas</option>
              <option value="months">Meses</option>
              <option value="years">Anos</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all shadow-md text-lg">
          Calcular Nova Data
        </button>
      </form>

      {result && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
          <p className="text-gray-500 text-sm mb-2">O resultado é:</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 inline-block min-w-[250px]">
            <p className="text-4xl font-extrabold text-blue-700 mb-2">{result.resultDateFormatted}</p>
            <div className="flex justify-center gap-2">
              <span className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-medium border border-gray-200 shadow-sm">
                {result.dayOfWeek}
              </span>
              {!result.isBusinessDay && (
                 <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold border border-orange-200">
                   Fim de Semana
                 </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}