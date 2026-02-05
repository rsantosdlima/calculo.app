"use client";

import { useState } from "react";
import {
  calculateSimulation2026,
  ComparisonResult,
} from "@/lib/irrf-2026-simulation";
import { CalculationParams, AlimonyType } from "@/lib/salary-calculations";

export default function IRRF2026Calculator() {
  // Estados do formulário
  const [salaryStr, setSalaryStr] = useState("");
  const [dependents, setDependents] = useState("0");
  const [alimonyStr, setAlimonyStr] = useState("0");

  // Estado do resultado (CORREÇÃO: Declarando a variável result)
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Parse dos inputs
    const grossSalary = parseFloat(
      salaryStr.replace(/\./g, "").replace(",", ".")
    );
    const numDependents = parseInt(dependents) || 0;
    const alimonyValue =
      parseFloat(alimonyStr.replace(/\./g, "").replace(",", ".")) || 0;

    if (isNaN(grossSalary) || grossSalary <= 0) {
      alert("Por favor, insira um salário bruto válido.");
      return;
    }

    // 2. Monta o objeto de parâmetros para o cálculo centralizado
    const params: CalculationParams = {
      grossSalary,
      numDependents,
      otherDiscounts: 0, // Não relevante para esta simulação
      hasAlimony: alimonyValue > 0,
      alimonyType: "fixed" as AlimonyType,
      alimonyFixedValue: alimonyValue,
      alimonyPercentage: 0,
      alimonyBaseValue: 0,
    };

    // 3. Chama a função de simulação
    const simulationResult = calculateSimulation2026(params);

    setResult(simulationResult);
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border border-blue-100 my-8">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Simulador Oficial
        </h2>
        <p className="text-gray-600 mt-2">
          Compare o IRRF 2025 com a nova Lei 15.270 (2026)
        </p>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6 max-w-2xl mx-auto">
        <div>
          <label
            htmlFor="ir26-salary"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Salário Bruto Mensal (R$) <span className="text-red-500">*</span>
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">R$</span>
            </div>
            <input
              type="text"
              id="ir26-salary"
              required
              placeholder="Ex: 3.500,00"
              className="block w-full rounded-md border-gray-300 pl-10 p-3 focus:border-blue-500 focus:ring-blue-500 text-lg bg-white text-gray-900"
              value={salaryStr}
              onChange={(e) => setSalaryStr(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="ir26-dependents"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Número de Dependentes
            </label>
            <input
              type="number"
              id="ir26-dependents"
              min="0"
              className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="ir26-alimony"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Pensão Alimentícia (R$){" "}
              <span className="text-xs font-normal text-gray-500">
                (Judicial)
              </span>
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">R$</span>
              </div>
              <input
                type="text"
                id="ir26-alimony"
                placeholder="Ex: 500,00"
                className="block w-full rounded-md border-gray-300 pl-10 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                value={alimonyStr}
                onChange={(e) => setAlimonyStr(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-md mt-6 text-lg"
        >
          Calcular minha redução
        </button>
      </form>

      {result && (
        <div className="mt-12 animate-in fade-in duration-500 scroll-mt-16">
          <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
            Resultado da simulação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Card Regra Atual */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-600 uppercase tracking-wider text-sm mb-2">
                  Regra até 2025
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Imposto devido hoje
                </p>
              </div>
              <p className="text-3xl font-bold text-gray-700">
                {formatCurrency(result.current2025.irrfDiscount)}
              </p>
            </div>

            {/* Card Nova Proposta */}
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-500 text-center relative overflow-hidden flex flex-col justify-between shadow-sm">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
                Lei 15.270/25
              </div>
              <div>
                <h4 className="font-bold text-blue-800 uppercase tracking-wider text-sm mb-2 pt-2">
                  A partir de Jan/2026
                </h4>
                <p className="text-sm text-blue-600 mb-4">
                  Novo imposto a pagar
                </p>
              </div>
              <p className="text-4xl font-extrabold text-blue-700">
                {formatCurrency(result.proposed2026.irrfDiscount)}
              </p>
            </div>
          </div>

          {/* Destaque da Diferença */}
          <div className="text-center max-w-2xl mx-auto">
            {result.reductionValue > 0.01 ? (
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl shadow-md transform transition-all hover:scale-[1.02]">
                <p className="text-green-800 font-bold text-lg mb-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Benefício mensal!
                </p>
                <p className="text-green-900 text-xl">
                  Você pagaria{" "}
                  <span className="font-extrabold text-3xl">
                    {formatCurrency(result.reductionValue)}
                  </span>{" "}
                  A MENOS de imposto todo mês.
                </p>

                {result.proposed2026.irrfDiscount === 0 && (
                  <p className="mt-4 inline-block bg-green-200 text-green-900 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide">
                    ✨ Isenção total alcançada ✨
                  </p>
                )}

                {/* Detalhamento do Salário Líquido */}
                <div className="mt-6 pt-4 border-t border-green-200 text-sm text-green-800 flex justify-between items-center">
                  <span>Seu salário líquido subiria para:</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(result.proposed2026.netSalary)}
                  </span>
                </div>
              </div>
            ) : result.proposedRuleApplied ? (
              // Regra aplicada, mas redução foi 0 (ex: já era isento)
              <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">
                  Para o salário informado, você já estaria isento ou o imposto
                  seria zero em ambos os cenários.
                </p>
              </div>
            ) : (
              // Fora da faixa (acima de 7350)
              <div className="bg-gray-100 border border-gray-200 p-6 rounded-lg max-w-xl mx-auto">
                <p className="text-gray-700 font-medium flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 text-gray-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sem alteração prevista.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  O salário informado está acima do teto de R$ 7.350,00 previsto na Lei. 
                  O cálculo permanece o mesmo da regra atual.
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-center text-gray-500 mt-6">
            *Simulação baseada nas regras do INSS 2025 e nos parâmetros da Lei 15.270/2025.
          </p>
        </div>
      )}
    </div>
  );
}