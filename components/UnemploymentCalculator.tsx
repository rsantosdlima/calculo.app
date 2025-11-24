"use client";

import { useState } from "react";
import { calculateUnemployment, UnemploymentResult } from "@/lib/unemployment-calculations";

export default function UnemploymentCalculator() {
  const [salary1, setSalary1] = useState("");
  const [salary2, setSalary2] = useState("");
  const [salary3, setSalary3] = useState("");
  const [monthsWorked, setMonthsWorked] = useState("");
  const [timesRequested, setTimesRequested] = useState("0"); // 0 = Primeira vez
  
  const [result, setResult] = useState<UnemploymentResult | null>(null);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse inputs
    const s1 = parseFloat(salary1.replace(/\./g, "").replace(",", ".")) || 0;
    const s2 = parseFloat(salary2.replace(/\./g, "").replace(",", ".")) || 0;
    const s3 = parseFloat(salary3.replace(/\./g, "").replace(",", ".")) || 0;
    const months = parseInt(monthsWorked) || 0;
    const requests = parseInt(timesRequested);

    if (months === 0) {
      alert("Por favor, informe o tempo de trabalho.");
      return;
    }

    if (s1 === 0 && s2 === 0 && s3 === 0) {
      alert("Informe pelo menos um dos últimos salários.");
      return;
    }

    const res = calculateUnemployment({
      salary1: s1,
      salary2: s2,
      salary3: s3,
      monthsWorked: months,
      timesRequested: requests
    });

    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Simulador de Seguro-Desemprego</h2>
      
      <form onSubmit={handleCalculate} className="space-y-6">
        
        {/* Últimos Salários */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Informe seus 3 últimos salários brutos:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-xs text-gray-500 mb-1 block">Antepenúltimo</span>
              <input type="text" placeholder="R$ 0,00" className="w-full border-gray-300 rounded-md p-2"
                value={salary1} onChange={(e) => setSalary1(e.target.value)} />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">Penúltimo</span>
              <input type="text" placeholder="R$ 0,00" className="w-full border-gray-300 rounded-md p-2"
                value={salary2} onChange={(e) => setSalary2(e.target.value)} />
            </div>
            <div>
              <span className="text-xs text-gray-500 mb-1 block">Último (Mês da rescisão)</span>
              <input type="text" placeholder="R$ 0,00" className="w-full border-gray-300 rounded-md p-2"
                value={salary3} onChange={(e) => setSalary3(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Dados do Contrato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Meses trabalhados</label>
            <input type="number" required min="1" max="360" placeholder="Ex: 18" className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={monthsWorked} onChange={(e) => setMonthsWorked(e.target.value)} />
            <p className="text-xs text-gray-500 mt-1">Tempo de carteira assinada neste contrato.</p>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Já solicitou o benefício antes?</label>
            <select className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={timesRequested} onChange={(e) => setTimesRequested(e.target.value)}>
              <option value="0">Não, é a primeira vez</option>
              <option value="1">Sim, uma vez</option>
              <option value="2">Sim, duas ou mais vezes</option>
            </select>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all shadow-md text-lg">
          Verificar Benefício
        </button>
      </form>

      {/* RESULTADOS */}
      {result && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {result.isEligible ? (
            <div className="bg-green-50 border border-green-200 rounded-xl overflow-hidden">
              <div className="p-6 text-center border-b border-green-200">
                <p className="text-sm font-bold text-green-800 uppercase tracking-wider mb-1">Você tem direito a</p>
                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-green-600">{result.installmentCount}</span>
                  <span className="text-xl text-green-700 font-medium">parcelas de</span>
                </div>
                <p className="text-4xl font-bold text-green-700 mt-2">{formatCurrency(result.installmentValue)}</p>
              </div>
              <div className="p-4 bg-green-100/50 flex justify-between items-center text-sm text-green-900">
                <span>Média Salarial: <strong>{formatCurrency(result.averageSalary)}</strong></span>
                <span>Total do Benefício: <strong>{formatCurrency(result.totalBenefit)}</strong></span>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-red-900 mb-2">Não elegível no momento</h3>
              <p className="text-red-700 font-medium">{result.ineligibilityReason}</p>
            </div>
          )}
          
          <p className="text-xs text-center text-gray-500 mt-6">
            * Cálculo baseado na Tabela do Seguro-Desemprego vigente. O valor exato pode variar conforme análise do Ministério do Trabalho.
          </p>
        </div>
      )}
    </div>
  );
}