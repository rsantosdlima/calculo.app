"use client";

import { useState, useEffect } from "react";
import { calculateTimeSum, TimeEntry, TimeResult } from "@/lib/time-calculations";

export default function TimeCalculator() {
  // Estado inicial com 2 linhas para começar
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: "1", value: "", operation: "add" },
    { id: "2", value: "", operation: "add" },
  ]);
  
  const [result, setResult] = useState<TimeResult | null>(null);

  // Cálculo automático a cada mudança
  useEffect(() => {
    const res = calculateTimeSum(entries);
    setResult(res);
  }, [entries]);

  const addRow = () => {
    setEntries([...entries, { id: crypto.randomUUID(), value: "", operation: "add" }]);
  };

  const removeRow = (id: string) => {
    if (entries.length === 1) return; // Mantém pelo menos 1
    setEntries(entries.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof TimeEntry, value: string) => {
    setEntries(
      entries.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  // Máscara simples de hora HH:MM ao digitar
  const handleTimeChange = (id: string, value: string) => {
    // Remove não números
    let clean = value.replace(/\D/g, "");
    
    // Limita a 4 dígitos
    if (clean.length > 4) clean = clean.slice(0, 4);
    
    // Formata visualmente
    let formatted = clean;
    if (clean.length >= 3) {
      formatted = clean.slice(0, clean.length - 2) + ":" + clean.slice(clean.length - 2);
    }
    
    updateEntry(id, "value", formatted);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Calculadora de Horas</h2>
        <div className="text-right">
          {result && (
            <div className={`text-3xl font-mono font-bold ${result.isNegative ? "text-red-600" : "text-blue-600"}`}>
              {result.formatted}
            </div>
          )}
          <p className="text-xs text-gray-400 uppercase font-semibold">Total Acumulado</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div key={entry.id} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
            {/* Botão de Operação */}
            <button
              onClick={() => updateEntry(entry.id, "operation", entry.operation === "add" ? "subtract" : "add")}
              className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center font-bold text-xl transition-colors ${
                entry.operation === "add" 
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
              title={entry.operation === "add" ? "Somar" : "Subtrair"}
            >
              {entry.operation === "add" ? "+" : "-"}
            </button>

            {/* Input de Hora */}
            <input
              type="text"
              className="flex-grow border-gray-300 rounded-lg p-3 text-lg font-mono bg-gray-50 focus:ring-blue-500 focus:bg-white transition-colors placeholder-gray-400"
              placeholder="00:00"
              value={entry.value}
              onChange={(e) => handleTimeChange(entry.id, e.target.value)}
              maxLength={5}
            />

            {/* Botão Remover */}
            <button
              onClick={() => removeRow(entry.id)}
              className="w-10 h-10 flex-shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors"
              title="Remover linha"
              disabled={entries.length === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={addRow}
          className="text-blue-600 font-medium hover:text-blue-800 text-sm flex items-center px-2 py-2 hover:bg-blue-50 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Adicionar Horário
        </button>
        
        <button
          onClick={() => setEntries([{ id: crypto.randomUUID(), value: "", operation: "add" }])}
          className="text-gray-500 font-medium hover:text-gray-700 text-sm px-2 py-2 hover:bg-gray-50 rounded-md transition-colors"
        >
          Limpar
        </button>
      </div>

      {/* Conversão Decimal */}
      {result && Math.abs(result.decimal) > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Conversão para Cálculo de Valor</h3>
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <span className="text-gray-600 text-sm">Em formato decimal:</span>
              <p className="font-mono font-bold text-lg text-gray-900">{result.decimal.toFixed(4)}</p>
            </div>
            <div className="text-right max-w-[180px]">
              <p className="text-xs text-gray-500 leading-tight">
                Multiplique este número pelo valor da sua hora para saber quanto receberá (ou descontará).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}