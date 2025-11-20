"use client";

import { useState } from "react";

// Interfaces
interface CalculationResult {
  grossSalary: number;
  inss: number;
  irrf: number;
  netSalary: number;
}

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>("");
  const [dependents, setDependents] = useState<string>("0");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateSalary = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(grossSalary);
    const numDependents = parseInt(dependents) || 0;

    if (isNaN(salary)) return;

    // 1. Calculate INSS (Progressive Table 2024)
    let inss = 0;
    const inssCeiling = 7786.02;
    let salaryForInss = Math.min(salary, inssCeiling);

    const range1 = 1412.00;
    const range2 = 2666.68;
    const range3 = 4000.03;

    let remainder = salaryForInss;

    // Tier 1
    const tier1 = Math.min(remainder, range1);
    inss += tier1 * 0.075;
    remainder -= tier1;

    // Tier 2
    if (remainder > 0) {
        const tier2 = Math.min(remainder, range2 - range1);
        inss += tier2 * 0.09;
        remainder -= tier2;
    }

    // Tier 3
    if (remainder > 0) {
        const tier3 = Math.min(remainder, range3 - range2);
        inss += tier3 * 0.12;
        remainder -= tier3;
    }

    // Tier 4
    if (remainder > 0) {
        const tier4 = remainder;
        inss += tier4 * 0.14;
    }

    // 2. Calculate IRRF
    const dependentDeduction = numDependents * 189.59;
    const baseSalaryIrrf = salary - inss - dependentDeduction;

    let irrf = 0;

    if (baseSalaryIrrf <= 2259.20) {
        irrf = 0;
    } else if (baseSalaryIrrf <= 2826.65) {
        irrf = (baseSalaryIrrf * 0.075) - 169.44;
    } else if (baseSalaryIrrf <= 3751.05) {
        irrf = (baseSalaryIrrf * 0.15) - 381.44;
    } else if (baseSalaryIrrf <= 4664.68) {
        irrf = (baseSalaryIrrf * 0.225) - 662.77;
    } else {
        irrf = (baseSalaryIrrf * 0.275) - 896.00;
    }

    if (irrf < 0) irrf = 0;

    const net = salary - inss - irrf;

    setResult({
        grossSalary: salary,
        inss: inss,
        irrf: irrf,
        netSalary: net
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Calculadora de Salário Líquido (2024)</h1>

      <form onSubmit={calculateSalary} className="space-y-4 mb-8">
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salário Bruto (R$)</label>
          <input
            type="number"
            id="salary"
            required
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            placeholder="Ex: 3000.00"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dependents" className="block text-sm font-medium text-gray-700">Número de Dependentes</label>
          <input
            type="number"
            id="dependents"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Calcular
        </button>
      </form>

      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Resultado</h2>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Salário Bruto</span>
              <span className="font-medium">R$ {result.grossSalary.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2 text-red-600">
              <span>INSS</span>
              <span>- R$ {result.inss.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2 text-red-600">
              <span>IRRF</span>
              <span>- R$ {result.irrf.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 text-xl font-bold text-green-600">
              <span>Salário Líquido</span>
              <span>R$ {result.netSalary.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
