"use client";

import { useState } from "react";
import { calculateThirteenth, ThirteenthResult } from "@/lib/thirteenth-calculations";

export default function ThirteenthCalculator() {
  const [grossSalaryStr, setGrossSalaryStr] = useState("");
  const [monthsWorked, setMonthsWorked] = useState("12");
  const [dependents, setDependents] = useState("0");
  // Por padrão, assumimos que a pessoa quer saber o total ou a 2ª parcela
  const [firstInstallmentPaid, setFirstInstallmentPaid] = useState(true); 
  const [result, setResult] = useState<ThirteenthResult | null>(null);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(grossSalaryStr.replace(/\./g, "").replace(",", "."));
    const months = parseInt(monthsWorked);
    const deps = parseInt(dependents);

    if (isNaN(salary) || salary <= 0) {
      alert("Por favor, insira um salário válido.");
      return;
    }

    const res = calculateThirteenth({
      grossSalary: salary,
      monthsWorked: months,
      dependents: deps,
      firstInstallmentPaid
    });

    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 my-8">
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900">Simulador de 13º Salário</h2>
        <p className="text-gray-500 text-sm">Veja quanto você recebe na 1ª e na 2ª parcela.</p>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6">
        {/* Salário */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Salário Bruto (R$)
          </label>
          <input
            type="text"
            required
            placeholder="Ex: 4.000,00"
            className="block w-full rounded-md border-gray-300 p-3 bg-white text-gray-900 text-lg"
            value={grossSalaryStr}
            onChange={(e) => setGrossSalaryStr(e.target.value)}
          />
        </div>

        {/* Meses e Dependentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Meses Trabalhados no Ano
            </label>
            <select
              className="block w-full rounded-md border-gray-300 p-3 bg-white text-gray-900"
              value={monthsWorked}
              onChange={(e) => setMonthsWorked(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>{m} meses</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Considere frações de mês com 15 dias ou mais como 1 mês inteiro.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Dependentes (IRRF)
            </label>
            <input
              type="number"
              min="0"
              className="block w-full rounded-md border-gray-300 p-3 bg-white text-gray-900"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all shadow-md text-lg"
        >
          Calcular 13º Salário
        </button>
      </form>

      {/* Resultados em Cards Lado a Lado */}
      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            {/* Card 1ª Parcela */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-200 text-green-800 text-xs px-3 py-1 rounded-bl-lg font-bold uppercase">
                Até 30 de Novembro
              </div>
              <h3 className="text-green-900 font-bold text-lg mb-1">1ª Parcela</h3>
              <p className="text-sm text-green-700 mb-4">Adiantamento (sem descontos)</p>
              <p className="text-3xl font-extrabold text-green-600">
                {formatCurrency(result.firstInstallment)}
              </p>
            </div>

            {/* Card 2ª Parcela */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-200 text-blue-800 text-xs px-3 py-1 rounded-bl-lg font-bold uppercase">
                Até 20 de Dezembro
              </div>
              <h3 className="text-blue-900 font-bold text-lg mb-1">2ª Parcela</h3>
              <p className="text-sm text-blue-700 mb-4">Valor Líquido (com descontos)</p>
              <p className="text-3xl font-extrabold text-blue-600">
                {formatCurrency(result.secondInstallment)}
              </p>
            </div>
          </div>

          {/* Detalhamento dos Descontos */}
          <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 border-b border-gray-200 pb-2">
              Detalhamento dos Cálculos
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Valor Bruto Total ({monthsWorked}/12 avos)</span>
                <span className="font-medium">{formatCurrency(result.grossTotal)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>(-) INSS</span>
                <span>{formatCurrency(result.inssValue)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>(-) IRRF</span>
                <span>{formatCurrency(result.irrfValue)}</span>
              </div>
              <div className="flex justify-between text-gray-500 border-t border-gray-200 pt-2 mt-2">
                <span>(-) Dedução da 1ª Parcela</span>
                <span>{formatCurrency(result.firstInstallment)}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-900 pt-2 mt-2 border-t border-gray-200 text-lg">
                <span>A Receber em Dezembro</span>
                <span>{formatCurrency(result.secondInstallment)}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-center text-gray-500 mt-6">
            * O cálculo considera as alíquotas de INSS e IRRF vigentes para 2025. O 13º salário possui tributação exclusiva (não soma com o salário do mês para cálculo do IR).
          </p>
        </div>
      )}
    </div>
  );
}