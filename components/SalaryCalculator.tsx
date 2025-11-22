"use client";

import { useState } from "react";
import {
  calculateSalary,
  CalculationResult,
  AlimonyType,
  CalculationParams,
} from "@/lib/salary-calculations";

export default function SalaryCalculator() {
  // Basic Inputs
  const [salaryStr, setSalaryStr] = useState("");
  const [dependents, setDependents] = useState("0");
  const [otherDiscountsStr, setOtherDiscountsStr] = useState("0");

  // Alimony Inputs
  const [hasAlimony, setHasAlimony] = useState(false);
  const [alimonyType, setAlimonyType] = useState<AlimonyType>("fixed");
  const [alimonyValueStr, setAlimonyValueStr] = useState("");
  const [alimonyPercentageStr, setAlimonyPercentageStr] = useState("");

  const [result, setResult] = useState<CalculationResult | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Parse Basic Inputs
    const grossSalary = parseFloat(
      salaryStr.replace(/\./g, "").replace(",", ".")
    );
    const numDependents = parseInt(dependents) || 0;
    const otherDiscounts =
      parseFloat(otherDiscountsStr.replace(/\./g, "").replace(",", ".")) || 0;

    if (isNaN(grossSalary) || grossSalary <= 0) {
      alert("Por favor, insira um salário bruto válido.");
      return;
    }

    // 2. Parse Alimony Inputs
    let alimonyFixedValue = 0;
    let alimonyPercentage = 0;
    let alimonyBaseValue = 0;

    if (hasAlimony) {
      if (alimonyType === "fixed") {
        alimonyFixedValue =
          parseFloat(alimonyValueStr.replace(/\./g, "").replace(",", ".")) || 0;
      } else {
        alimonyPercentage = parseFloat(alimonyPercentageStr.replace(",", ".")) || 0;
        alimonyBaseValue = parseFloat(alimonyValueStr.replace(/\./g, "").replace(",", ".")) || 0;
        
        if (alimonyBaseValue <= 0) {
             alimonyBaseValue = grossSalary;
        }
      }
    }

    // 3. Preparar objeto de parâmetros
    const params: CalculationParams = {
        grossSalary,
        numDependents,
        otherDiscounts,
        hasAlimony,
        alimonyType,
        alimonyFixedValue,
        alimonyPercentage,
        alimonyBaseValue
    };

    // 4. Call Calculation Logic
    const calculationResult = calculateSalary(params);

    setResult(calculationResult);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 my-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
        Simulador de Salário Líquido
      </h2>

      <form onSubmit={handleCalculate} className="space-y-6">
        {/* --- Seção 1: Dados Básicos --- */}
        <div className="space-y-4">
          <h3 className="text-md font-medium text-gray-700 border-b pb-2">
            Dados Principais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label
                htmlFor="sc-salary"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Salário Bruto (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="sc-salary"
                required
                placeholder="Ex: 5.000,00"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
                value={salaryStr}
                onChange={(e) => setSalaryStr(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="sc-dependents"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nº de Dependentes (IRRF)
              </label>
              <input
                type="number"
                id="sc-dependents"
                min="0"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
                value={dependents}
                onChange={(e) => setDependents(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="sc-others"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Outros Descontos (R$){" "}
                <span className="text-xs text-gray-500">(Opcional)</span>
              </label>
              <input
                type="text"
                id="sc-others"
                placeholder="Ex: VT, VR, Plano..."
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
                value={otherDiscountsStr}
                onChange={(e) => setOtherDiscountsStr(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- Seção 2: Pensão Alimentícia --- */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-medium text-gray-700">
              Pensão Alimentícia Judicial
            </h3>
            <div className="flex items-center">
              <input
                id="sc-hasAlimony"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={hasAlimony}
                onChange={(e) => setHasAlimony(e.target.checked)}
              />
              <label
                htmlFor="sc-hasAlimony"
                className="ml-2 block text-sm text-gray-900"
              >
                Pago pensão
              </label>
            </div>
          </div>

          {hasAlimony && (
            <div className="bg-blue-50 p-4 rounded-md animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Cálculo da Pensão
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="fixed"
                        checked={alimonyType === "fixed"}
                        onChange={() => setAlimonyType("fixed")}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Valor Fixo (R$)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="percentage"
                        checked={alimonyType === "percentage"}
                        onChange={() => setAlimonyType("percentage")}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Porcentagem (%)
                      </span>
                    </label>
                  </div>
                </div>

                {alimonyType === "fixed" ? (
                  <div className="md:col-span-2">
                    <label
                      htmlFor="sc-alimonyFixed"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Valor Total da Pensão (R$)
                    </label>
                    <input
                      type="text"
                      id="sc-alimonyFixed"
                      required={hasAlimony && alimonyType === "fixed"}
                      placeholder="Ex: 800,00"
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
                      value={alimonyValueStr}
                      onChange={(e) => setAlimonyValueStr(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label
                        htmlFor="sc-alimonyPercentage"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Porcentagem (%)
                      </label>
                      <input
                        type="text"
                        id="sc-alimonyPercentage"
                        required={hasAlimony && alimonyType === "percentage"}
                        placeholder="Ex: 30"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
                        value={alimonyPercentageStr}
                        onChange={(e) =>
                          setAlimonyPercentageStr(e.target.value)
                        }
                      />
                    </div>
                     <div>
                      <label
                        htmlFor="sc-alimonyBase"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Base de Cálculo (R$)
                      </label>
                       <input
                        type="text"
                        id="sc-alimonyBase"
                        placeholder={`Padrão: ${salaryStr || 'Salário Bruto'}`}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
                        value={alimonyValueStr}
                        onChange={(e) => setAlimonyValueStr(e.target.value)}
                      />
                       <p className="text-xs text-gray-500 mt-1">Deixe em branco para usar o Salário Bruto.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors shadow-md mt-6"
        >
          Calcular Salário Líquido
        </button>
      </form>

      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 animate-in fade-in duration-300 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Resultado Detalhado (2025)
          </h3>

          <div className="space-y-3 text-sm">
            {/* Bruto */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">
                Salário Bruto:
              </span>
              <span className="font-bold text-gray-900 text-base">
                {formatCurrency(result.grossSalary)}
              </span>
            </div>

            {/* Descontos Oficiais */}
            <div className="border-t border-gray-100 pt-2 space-y-2">
              <div className="flex justify-between text-red-600">
                <span>
                  (-) INSS{" "}
                  {result.grossSalary > 7786.02 ? (
                    <span className="text-xs bg-red-100 px-1 rounded">
                      TETO
                    </span>
                  ) : null}
                  :
                </span>
                <span>{formatCurrency(result.inssDiscount)}</span>
              </div>

              {result.alimonyDiscount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>(-) Pensão Alimentícia:</span>
                  <span>{formatCurrency(result.alimonyDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-red-600">
                <span>(-) IRRF (Imposto de Renda):</span>
                <span>{formatCurrency(result.irrfDiscount)}</span>
              </div>
            </div>

            {/* Outros Descontos */}
            {result.otherDiscounts > 0 && (
              <div className="flex justify-between text-gray-600 border-t border-gray-100 pt-2">
                <span>(-) Outros Descontos:</span>
                <span>{formatCurrency(result.otherDiscounts)}</span>
              </div>
            )}

            {/* Notas de Rodapé do Cálculo */}
            <div className="border-t border-gray-100 pt-3 mt-2">
              {result.usedSimplifiedDiscount ? (
                <p className="text-xs text-blue-700 bg-blue-50 p-2 rounded border border-blue-100">
                  ℹ️ <strong>IRRF:</strong> Foi aplicado o Desconto Simplificado
                  (R$ 564,80) pois resultou em um imposto menor que as deduções
                  legais. Base de cálculo:{" "}
                  {formatCurrency(result.irrfBase)}.
                </p>
              ) : (
                <p className="text-xs text-gray-600 bg-gray-100 p-2 rounded border border-gray-200">
                  ℹ️ <strong>IRRF:</strong> Foram utilizadas as Deduções Legais
                  (INSS, dependentes e pensão) para o cálculo. Base de cálculo:{" "}
                  {formatCurrency(result.irrfBase)}.
                </p>
              )}
            </div>
          </div>

          {/* Resultado Final */}
          <div className="mt-6 bg-white p-5 rounded-lg border-2 border-blue-600 text-center shadow-sm">
            <span className="text-sm font-bold text-gray-600 uppercase tracking-wide block mb-1">
              Salário Líquido a Receber
            </span>
            <span className="text-4xl font-extrabold text-blue-700">
              {formatCurrency(result.netSalary)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}