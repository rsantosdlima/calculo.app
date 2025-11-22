"use client";

import { useState } from "react";
import {
  INSS_TABLE,
  IRRF_TABLE,
  DEPENDENT_DEDUCTION,
  IRRF_SIMPLIFIED_DISCOUNT,
  INSS_CEILING,
} from "@/lib/tax-tables";

interface CalculationResult {
  grossSalary: number;
  inssDiscount: number;
  irrfDiscount: number;
  netSalary: number;
  irrfBase: number;
  usedSimplifiedDiscount: boolean;
  alimonyValue: number;
}

export default function SalaryCalculator() {
  const [salaryStr, setSalaryStr] = useState("");
  const [dependents, setDependents] = useState("0");
  const [alimonyStr, setAlimonyStr] = useState("0");
  const [otherDiscountsStr, setOtherDiscountsStr] = useState("0");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // --- LÓGICA DE CÁLCULO DO INSS (Progressivo com Teto) ---
  const calculateINSS = (grossSalary: number) => {
    // 1. Verifica se o salário ultrapassa o teto da última faixa
    const lastBracket = INSS_TABLE[INSS_TABLE.length - 1];
    if (grossSalary > lastBracket.limit) {
      // Se ultrapassar, o desconto é o teto máximo fixo (soma das deduções máximas das faixas)
      // Para 2025, isso deve dar aprox. R$ 951,63
      return lastBracket.limit * lastBracket.rate - lastBracket.deduction;
    }

    // 2. Se não ultrapassar, faz o cálculo progressivo normal
    let totalINSS = 0;
    for (const bracket of INSS_TABLE) {
      if (grossSalary > bracket.limit) {
        continue; // Continua até achar a faixa correta
      } else {
        // Achou a faixa, aplica a fórmula: (Salário * Alíquota) - Dedução da faixa
        totalINSS = grossSalary * bracket.rate - bracket.deduction;
        break;
      }
    }
    return totalINSS;
  };

  // --- LÓGICA DE CÁLCULO DO IRRF ---
  const calculateIRRF = (baseSalary: number) => {
    if (baseSalary <= 0) return 0;
    for (const bracket of IRRF_TABLE) {
      if (bracket.limit === null || baseSalary <= bracket.limit) {
        return baseSalary * bracket.rate - bracket.deduction;
      }
    }
    return 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const grossSalary = parseFloat(
      salaryStr.replace(/\./g, "").replace(",", ".")
    );
    const numDependents = parseInt(dependents) || 0;
    const alimonyValue =
      parseFloat(alimonyStr.replace(/\./g, "").replace(",", ".")) || 0;
    const otherDiscounts =
      parseFloat(otherDiscountsStr.replace(/\./g, "").replace(",", ".")) || 0;

    if (isNaN(grossSalary) || grossSalary <= 0) {
      alert("Por favor, insira um salário bruto válido.");
      return;
    }

    // 1. Calcula INSS (com teto corrigido)
    const inssDiscount = calculateINSS(grossSalary);

    // 2. Calcula Base do IR (Duas formas: Legal vs Simplificada)
    // A pensão alimentícia judicial é deduzida da base legal.

    // Forma A: Deduções Legais (INSS + Dependentes + Pensão)
    const totalDependentDeduction = numDependents * DEPENDENT_DEDUCTION;
    const irrfBaseLegal =
      grossSalary - inssDiscount - totalDependentDeduction - alimonyValue;
    const irrfLegal = calculateIRRF(irrfBaseLegal);

    // Forma B: Desconto Simplificado
    // O desconto simplificado substitui as deduções legais. A pensão NÃO é deduzida aqui.
    const irrfBaseSimplified = grossSalary - IRRF_SIMPLIFIED_DISCOUNT;
    const irrfSimplified = calculateIRRF(irrfBaseSimplified);

    let irrfDiscount = 0;
    let usedSimplified = false;
    let finalIrrfBase = 0;

    // Decide qual é mais vantajoso (menor imposto, sem ser negativo)
    if (irrfSimplified < irrfLegal && irrfSimplified >= 0) {
      irrfDiscount = irrfSimplified;
      usedSimplified = true;
      finalIrrfBase = irrfBaseSimplified;
    } else {
      irrfDiscount = Math.max(0, irrfLegal);
      usedSimplified = false;
      finalIrrfBase = irrfBaseLegal;
    }

    // 3. Salário Líquido Final (Subtrai todos os descontos reais)
    const netSalary =
      grossSalary -
      inssDiscount -
      irrfDiscount -
      alimonyValue -
      otherDiscounts;

    setResult({
      grossSalary,
      inssDiscount,
      irrfDiscount,
      netSalary,
      irrfBase: Math.max(0, finalIrrfBase),
      usedSimplifiedDiscount: usedSimplified,
      alimonyValue,
    });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 my-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
        Simulador de Salário
      </h2>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label
            htmlFor="sc-salary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Salário Bruto (R$)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sc-dependents"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Número de Dependentes
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
              htmlFor="sc-alimony"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pensão Alimentícia (R$){" "}
              <span className="text-gray-400 text-xs">(Judicial)</span>
            </label>
            <input
              type="text"
              id="sc-alimony"
              placeholder="Ex: 800,00"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
              value={alimonyStr}
              onChange={(e) => setAlimonyStr(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="sc-others"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Outros Descontos (R$){" "}
            <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <input
            type="text"
            id="sc-others"
            placeholder="Ex: Vale transporte, plano de saúde..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
            value={otherDiscountsStr}
            onChange={(e) => setOtherDiscountsStr(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-md mt-4"
        >
          Calcular Salário Líquido
        </button>
      </form>

      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 animate-in fade-in duration-300 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Resultado do Cálculo
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Salário Bruto:</span>
              <span className="font-medium">
                {formatCurrency(result.grossSalary)}
              </span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>
                (-) Desconto INSS{" "}
                {result.grossSalary > INSS_CEILING ? "(Teto)" : ""}:
              </span>
              <span>{formatCurrency(result.inssDiscount)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>(-) Desconto IRRF:</span>
              <span>{formatCurrency(result.irrfDiscount)}</span>
            </div>
            {result.alimonyValue > 0 && (
              <div className="flex justify-between text-red-600">
                <span>(-) Pensão Alimentícia:</span>
                <span>{formatCurrency(result.alimonyValue)}</span>
              </div>
            )}
            {parseFloat(otherDiscountsStr) > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>(-) Outros Descontos:</span>
                <span>
                  {formatCurrency(
                    parseFloat(otherDiscountsStr.replace(",", "."))
                  )}
                </span>
              </div>
            )}

            <div className="border-t border-gray-100 pt-2 mt-2">
              {result.usedSimplifiedDiscount ? (
                <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                  * Foi aplicado o <strong>Desconto Simplificado</strong> do
                  IRRF pois resultou em um imposto menor para você. Base de
                  cálculo: {formatCurrency(result.irrfBase)}.
                </p>
              ) : (
                <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  * Foram aplicadas as <strong>Deduções Legais</strong> (INSS,
                  dependentes e pensão) para o cálculo do IRRF. Base de cálculo:{" "}
                  {formatCurrency(result.irrfBase)}.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 bg-white p-5 rounded-lg border-2 border-blue-100 text-center">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wide block mb-1">
              Salário Líquido (A Receber)
            </span>
            <span className="text-4xl font-extrabold text-blue-600">
              {formatCurrency(result.netSalary)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}