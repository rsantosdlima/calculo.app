"use client";

import { useState } from "react";
import {
  calculateWorkingDays,
  WorkingDaysResult,
} from "@/lib/date-calculations";

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Agora o estado armazena o objeto completo do resultado, não só o número
  const [result, setResult] = useState<WorkingDaysResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const calculationResult = calculateWorkingDays(startDate, endDate);
    setResult(calculationResult);
    setShowDetails(false); // Reseta a visualização dos detalhes ao recalcular
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 my-8">
      {/* Aviso de orientação sobre o cálculo */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <span className="font-bold">Como funciona:</span> O cálculo
              considera o intervalo <strong>inclusive</strong> (data inicial e
              final contam). São excluídos sábados, domingos e feriados
              nacionais do Brasil.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="wd-startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data inicial
            </label>
            <input
              type="date"
              id="wd-startDate"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="wd-endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data final
            </label>
            <input
              type="date"
              id="wd-endDate"
              required
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
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

      {result !== null && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 animate-in fade-in duration-300">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Resultado do cálculo
          </h3>

          <div className="text-center">
            <p className="text-gray-500 text-sm tracking-wide mb-2">
              Total de dias úteis no período
            </p>
            <div className="inline-block bg-white rounded-full px-8 py-4 shadow-sm border border-blue-100">
              <p className="text-5xl font-extrabold text-blue-600 leading-none">
                {result.totalWorkingDays}
              </p>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              Intervalo entre <strong>{formatDateDisplay(startDate)}</strong> e{" "}
              <strong>{formatDateDisplay(endDate)}</strong> (inclusive).
            </p>
          </div>

          {/* Seção de Detalhamento dos Dias Excluídos */}
          {result.excludedDays.length > 0 && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center focus:outline-none"
              >
                {showDetails ? "Ocultar detalhes" : "Ver dias desconsiderados"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-4 h-4 ml-1 transition-transform ${
                    showDetails ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showDetails && (
                <div className="mt-4 bg-white rounded-md border border-gray-200 overflow-hidden text-sm">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Data
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Motivo da exclusão
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {result.excludedDays.map((day, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-gray-900">
                            {day.date}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-gray-500">
                            {day.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="p-3 text-xs text-gray-500 bg-gray-50 border-t border-gray-100">
                    Total de {result.excludedDays.length} dias não úteis (finais
                    de semana ou feriados).
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}