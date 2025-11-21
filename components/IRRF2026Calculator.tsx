"use client";

import { useState } from "react";
import { calculateSimulation2026, ComparisonResult } from "@/lib/irrf-2026-simulation";
import { AlimonyType } from "@/lib/salary-calculations";

export default function IRRF2026Calculator() {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [dependents, setDependents] = useState<string>("0");
  const [otherDiscounts, setOtherDiscounts] = useState<string>("0");
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(grossSalary);
    const numDependents = parseInt(dependents) || 0;
    const discounts = parseFloat(otherDiscounts) || 0;

    if (isNaN(salary)) return;

    const res = calculateSimulation2026({
      grossSalary: salary,
      dependents: numDependents,
      otherDiscounts: discounts,
      hasAlimony: false,
      alimonyType: AlimonyType.FIXED_VALUE,
      alimonyValue: 0
    });

    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Simulador IRRF 2026</h1>
      <h2 className="text-sm text-gray-500 mb-6 uppercase tracking-wide">Projeto de Lei (PL) 1.087/2025</h2>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <div className="flex">
            <div className="ml-3">
                <p className="text-sm text-yellow-700">
                    Esta ferramenta simula o impacto do PL 1.087/2025, que propõe <strong>isenção para quem ganha até R$ 5.000</strong> e redução gradual para salários até R$ 7.350.
                </p>
            </div>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salário Bruto (R$)</label>
                <input
                    type="number"
                    id="salary"
                    required
                    step="0.01"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    placeholder="Ex: 5000.00"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-1">Dependentes</label>
                <input
                    type="number"
                    id="dependents"
                    min="0"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                    value={dependents}
                    onChange={(e) => setDependents(e.target.value)}
                />
            </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-lg"
        >
          Comparar Cenários
        </button>
      </form>

      {result && (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 2025 Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Regra Atual (2025)</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Salário Bruto</span>
                            <span>R$ {result.current2025.grossSalary.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-red-500">
                            <span>(-) INSS</span>
                            <span>R$ {result.current2025.inss.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-red-500 font-medium">
                            <span>(-) IRRF</span>
                            <span>R$ {result.current2025.irrf.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-300 pt-3 mt-2 flex justify-between text-lg font-bold text-gray-800">
                            <span>Líquido</span>
                            <span>R$ {result.current2025.netSalary.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* 2026 Card */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                        NOVO
                    </div>
                    <h3 className="text-lg font-bold text-green-800 mb-4 text-center">Simulação 2026 (PL 1.087)</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Salário Bruto</span>
                            <span>R$ {result.simulated2026.grossSalary.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-red-500">
                            <span>(-) INSS</span>
                            <span>R$ {result.simulated2026.inss.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-green-600 font-medium">
                            <span>(-) IRRF (Reduzido)</span>
                            <div className="text-right">
                                <span className="line-through text-red-300 text-xs mr-2">
                                    R$ {result.current2025.irrf.toFixed(2)}
                                </span>
                                <span>R$ {result.simulated2026.irrf.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="border-t border-green-200 pt-3 mt-2 flex justify-between text-lg font-bold text-green-700">
                            <span>Líquido</span>
                            <span>R$ {result.simulated2026.netSalary.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Difference Highlight */}
            {result.monthlyGain > 0 && (
                <div className="bg-blue-600 text-white rounded-lg p-6 text-center shadow-lg animate-pulse-slow">
                    <p className="text-lg opacity-90">Com a nova lei, você economizaria:</p>
                    <p className="text-4xl font-bold my-2">R$ {result.monthlyGain.toFixed(2)} / mês</p>
                    <p className="text-sm opacity-75">Aprox. R$ {(result.yearlyGain).toFixed(2)} por ano</p>
                </div>
            )}
             {result.monthlyGain === 0 && (
                <div className="bg-gray-100 text-gray-600 rounded-lg p-4 text-center">
                    <p>Nenhuma alteração prevista para esta faixa salarial.</p>
                </div>
            )}
        </div>
      )}
    </div>
  );
}
