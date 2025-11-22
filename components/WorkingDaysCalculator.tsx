"use client";

import { useState } from "react";
// Importa a nova função que adicionamos no passo 2
import { calculateWorkingDays } from "@/lib/date-calculations";

export default function WorkingDaysCalculator() {
  // Estados para guardar as datas escolhidas e o resultado
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [workingDaysResult, setWorkingDaysResult] = useState<number | null>(null);

  // Função que roda quando clica no botão
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    // Chama a lógica inteligente que usa a biblioteca automática
    const days = calculateWorkingDays(startDate, endDate);
    setWorkingDaysResult(days);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 my-8">
      
      {/* Aviso azul explicando a regra */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            {/* Ícone de informação */}
            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <span className="font-bold">Como funciona:</span> O cálculo considera apenas de segunda a sexta-feira, excluindo sábados, domingos e feriados nacionais do Brasil (inclusive os móveis como Carnaval e Corpus Christi).
            </p>
          </div>
        </div>
      </div>

      {/* Formulário com as datas */}
      <form onSubmit={handleCalculate} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="wd-startDate" className="block text-sm font-medium text-gray-700 mb-1">Data inicial</label>
                <input
                    type="date"
                    id="wd-startDate"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="wd-endDate" className="block text-sm font-medium text-gray-700 mb-1">Data final</label>
                <input
                    type="date"
                    id="wd-endDate"
                    required
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-md"
        >
          Calcular dias úteis
        </button>
      </form>

      {/* Área onde aparece o resultado (só aparece se tiver resultado) */}
      {workingDaysResult !== null && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3 animate-in fade-in duration-300">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Resultado do cálculo</h3>

          <div className="text-center">
            <p className="text-gray-500 text-sm tracking-wide mb-2 uppercase">Total de dias úteis</p>
            <div className="inline-block bg-white rounded-lg px-10 py-6 shadow-sm border border-blue-100">
                <p className="text-6xl font-extrabold text-blue-600 leading-none">
                    {workingDaysResult}
                </p>
            </div>
             {/* Exibe as datas selecionadas para confirmação */}
             <p className="text-gray-600 mt-4 text-sm">
                No período selecionado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}