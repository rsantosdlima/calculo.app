"use client";

import { useState } from "react";
import { calculateAge, AgeResult } from "@/lib/date-utilities";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const res = calculateAge(birthDate);
    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-100 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Qual a minha idade exata?</h2>
      
      <form onSubmit={handleCalculate} className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full">
          <label className="block text-sm font-bold text-gray-700 mb-2">Data de Nascimento</label>
          <input 
            type="date" 
            required
            className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900 text-lg"
            value={birthDate} 
            onChange={(e) => setBirthDate(e.target.value)} 
          />
        </div>
        <button type="submit" className="w-full md:w-auto bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition-all shadow-md text-lg h-[52px]">
          Calcular
        </button>
      </form>

      {result && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Resultado Principal */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center mb-6">
            <p className="text-sm text-purple-800 uppercase tracking-wider font-bold mb-2">Você tem exatamente</p>
            <div className="text-4xl md:text-5xl font-extrabold text-purple-700 leading-tight">
              {result.years} anos
            </div>
            <div className="text-xl text-purple-600 mt-2 font-medium">
              {result.months} meses e {result.days} dias
            </div>
          </div>

          {/* Curiosidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-lg flex items-center">
              <span className="text-2xl mr-3">🎂</span>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Próximo Aniversário</p>
                <p className="text-gray-900 font-semibold">Em {result.daysToBirthday} dias</p>
                <p className="text-sm text-gray-500">Cairá em uma {result.nextBirthday}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-lg flex items-center">
              <span className="text-2xl mr-3">⏳</span>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold">Total de Dias Vividos</p>
                <p className="text-gray-900 font-semibold">{new Intl.NumberFormat('pt-BR').format(result.totalDays)} dias</p>
                <p className="text-sm text-gray-500">Aproveite cada um!</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}