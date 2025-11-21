"use client";

import { useState } from "react";
import { calculateSalary, CalculationResult, AlimonyType, calculateIRRF2026 } from "@/lib/salary-calculations";

export default function SimuladorIRRF2026() {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [dependents, setDependents] = useState<string>("0");
  const [otherDiscounts, setOtherDiscounts] = useState<string>("0");
  const [hasAlimony, setHasAlimony] = useState<boolean>(false);
  const [alimonyType, setAlimonyType] = useState<AlimonyType>(AlimonyType.PERCENT_MIN_WAGE);
  const [alimonyValueInput, setAlimonyValueInput] = useState<string>("");

  const [result2025, setResult2025] = useState<CalculationResult | null>(null);
  const [result2026, setResult2026] = useState<CalculationResult | null>(null);
  const [irrfReduction, setIrrfReduction] = useState<number>(0);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(grossSalary);
    const numDependents = parseInt(dependents) || 0;
    const discounts = parseFloat(otherDiscounts) || 0;
    let val = parseFloat(alimonyValueInput);
    if (isNaN(val) && hasAlimony) val = 0;

    // 2025
    const res2025 = calculateSalary({
      grossSalary: salary,
      dependents: numDependents,
      otherDiscounts: discounts,
      hasAlimony,
      alimonyType,
      alimonyValue: val
    });

    // 2026
    const inss = res2025.inss;
    const alimony = res2025.alimony;
    const irrf2026Obj = calculateIRRF2026(salary, inss, numDependents, alimony);

    const netSalary2026 = salary - inss - irrf2026Obj.irrf - alimony - discounts;

    setResult2025(res2025);
    setResult2026({
      grossSalary: salary,
      inss,
      irrf: irrf2026Obj.irrf,
      alimony,
      otherDiscounts: discounts,
      netSalary: netSalary2026,
      usedSimplified: irrf2026Obj.usedSimplified
    });
    setIrrfReduction(irrf2026Obj.reduction);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Simulador IRRF 2026 (Projeto de Lei 1.087/2025)
      </h1>
      <form onSubmit={handleCalculate} className="space-y-6 mb-8">
        {/* Main Fields Grid - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salário Bruto (R$)</label>
            <input
                type="number"
                id="salary"
                required
                step="0.01"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                placeholder="Ex: 3000.00"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-1">Número de Dependentes</label>
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

        {/* Other Discounts */}
        <div>
            <label htmlFor="otherDiscounts" className="block text-sm font-medium text-gray-700 mb-1">Outros Descontos (R$)</label>
            <input
                type="number"
                id="otherDiscounts"
                min="0"
                step="0.01"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                placeholder="Ex: Vale Transporte, Plano de Saúde..."
                value={otherDiscounts}
                onChange={(e) => setOtherDiscounts(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Valor descontado do líquido, não afeta impostos.</p>
        </div>

        {/* Alimony Checkbox */}
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="hasAlimony"
                checked={hasAlimony}
                onChange={(e) => setHasAlimony(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hasAlimony" className="text-sm font-medium text-gray-700">Paga Pensão Alimentícia?</label>
        </div>

        {/* Alimony Section (Conditional) */}
        {hasAlimony && (
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 space-y-4 animate-fade-in">
                <h3 className="text-sm font-semibold text-blue-800">Detalhes da Pensão</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="alimonyType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cálculo</label>
                        <select
                            id="alimonyType"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white"
                            value={alimonyType}
                            onChange={(e) => setAlimonyType(parseInt(e.target.value) as AlimonyType)}
                        >
                            <option value={AlimonyType.PERCENT_MIN_WAGE}>% do Salário Mínimo</option>
                            <option value={AlimonyType.PERCENT_NET_SALARY}>% do Salário Líquido</option>
                            <option value={AlimonyType.FIXED_VALUE}>Valor Fixo (R$)</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="alimonyValue" className="block text-sm font-medium text-gray-700 mb-1">
                             {alimonyType === AlimonyType.FIXED_VALUE ? "Valor (R$)" : "Percentual (%)"}
                        </label>
                        <input
                            type="number"
                            id="alimonyValue"
                            step="0.01"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                            placeholder={alimonyType === AlimonyType.FIXED_VALUE ? "0,00" : "30%"}
                            value={alimonyValueInput}
                            onChange={(e) => setAlimonyValueInput(e.target.value)}
                        />
                    </div>
                </div>
                {alimonyType === AlimonyType.PERCENT_NET_SALARY && (
                     <p className="text-xs text-blue-600">
                        * O cálculo será feito descontando INSS e IRRF para encontrar a base da pensão.
                     </p>
                )}
            </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-lg"
        >
          Calcular
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cenário 2025 */}
        {result2025 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Cenário Atual (2025)</h2>
            <div className="flex justify-between text-gray-600">
              <span>Salário Bruto</span>
              <span className="font-medium">R$ {result2025.grossSalary.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>(-) INSS</span>
              <span>R$ {result2025.inss.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>(-) IRRF</span>
              <span>R$ {result2025.irrf.toFixed(2)}</span>
            </div>
            {result2025.alimony > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>(-) Pensão Alimentícia</span>
                <span>R$ {result2025.alimony.toFixed(2)}</span>
              </div>
            )}
            {result2025.otherDiscounts > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>(-) Outros Descontos</span>
                <span>R$ {result2025.otherDiscounts.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-300 pt-3 mt-2 flex justify-between text-xl font-bold text-green-700 bg-green-50 -mx-6 px-6 py-4 rounded-b-lg border-b border-green-100">
              <span>Salário Líquido</span>
              <span>R$ {result2025.netSalary.toFixed(2)}</span>
            </div>
          </div>
        )}
        {/* Cenário 2026 */}
        {result2026 && (
          <div className="bg-gray-50 border border-blue-200 rounded-lg p-6 space-y-3">
            <h2 className="text-lg font-semibold text-blue-800 border-b border-blue-200 pb-2 mb-4">Cenário PL 1.087/2025 (2026)</h2>
            <div className="flex justify-between text-gray-600">
              <span>Salário Bruto</span>
              <span className="font-medium">R$ {result2026.grossSalary.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>(-) INSS</span>
              <span>R$ {result2026.inss.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>(-) IRRF <span className="text-xs ml-1 bg-blue-100 text-blue-800 px-1 rounded">Redução PL</span></span>
              <span>R$ {result2026.irrf.toFixed(2)}</span>
            </div>
            {irrfReduction > 0 && (
              <div className="flex justify-between text-blue-600">
                <span>Redução aplicada</span>
                <span>R$ {irrfReduction.toFixed(2)}</span>
              </div>
            )}
            {result2026.alimony > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>(-) Pensão Alimentícia</span>
                <span>R$ {result2026.alimony.toFixed(2)}</span>
              </div>
            )}
            {result2026.otherDiscounts > 0 && (
              <div className="flex justify-between text-orange-600">
                <span>(-) Outros Descontos</span>
                <span>R$ {result2026.otherDiscounts.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-blue-300 pt-3 mt-2 flex justify-between text-xl font-bold text-blue-700 bg-blue-50 -mx-6 px-6 py-4 rounded-b-lg border-b border-blue-100">
              <span>Salário Líquido</span>
              <span>R$ {result2026.netSalary.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}