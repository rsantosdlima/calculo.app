"use client";

import { useState } from "react";
import {
  INSS_TABLE,
  IRRF_TABLE,
  DEPENDENT_DEDUCTION,
  IRRF_SIMPLIFIED_DISCOUNT,
} from "@/lib/tax-tables";

interface ComparisonResult {
  grossSalary: number;
  currentIRRF: number;
  proposedIRRF: number;
  difference: number;
  proposedRuleApplied: boolean; // Indica se a regra dos R$ 7350 foi aplicada
}

export default function IRRF2026Calculator() {
  const [salaryStr, setSalaryStr] = useState("");
  const [dependents, setDependents] = useState("0");
  const [alimonyStr, setAlimonyStr] = useState("0"); // Campo de Pensão
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // --- Funções Auxiliares de Cálculo (Reutilizadas) ---
  const calculateINSS = (grossSalary: number) => {
    let totalINSS = 0;
    const lastBracket = INSS_TABLE[INSS_TABLE.length - 1];
    if (grossSalary > lastBracket.limit) {
      return lastBracket.limit * lastBracket.rate - lastBracket.deduction;
    }
    for (const bracket of INSS_TABLE) {
      if (grossSalary > bracket.limit) {
        continue;
      } else {
        totalINSS = grossSalary * bracket.rate - bracket.deduction;
        break;
      }
    }
    return totalINSS;
  };

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

    if (isNaN(grossSalary) || grossSalary <= 0) {
      alert("Por favor, insira um salário bruto válido.");
      return;
    }

    const inss = calculateINSS(grossSalary);

    // --- CÁLCULO REGRA ATUAL (2025) ---
    const irrfBaseLegal =
      grossSalary -
      inss -
      numDependents * DEPENDENT_DEDUCTION -
      alimonyValue;
    const irrfLegal = calculateIRRF(irrfBaseLegal);

    const irrfBaseSimplified = grossSalary - IRRF_SIMPLIFIED_DISCOUNT;
    const irrfSimplified = calculateIRRF(irrfBaseSimplified);

    // Pega o mais vantajoso (menor imposto) para o cenário atual
    const currentIRRF = Math.max(0, Math.min(irrfLegal, irrfSimplified));

    // --- CÁLCULO PROPOSTA (PL 1087/2025) ---
    // Regra: Desconto simplificado de R$ 600 se salário <= R$ 7.350
    const PROPOSED_LIMIT = 7350.0;
    const PROPOSED_DISCOUNT = 600.0;
    let proposedIRRF = 0;
    let proposedRuleApplied = false;

    if (grossSalary <= PROPOSED_LIMIT) {
      // Aplica a nova regra de dedução simplificada de R$ 600
      // A base é Salário Bruto - INSS - Novo Desconto
      // (Nota: O texto do PL sugere que esse desconto substitui as outras deduções legais nessa faixa)
      const proposedBase = grossSalary - inss - PROPOSED_DISCOUNT;
      proposedIRRF = Math.max(0, calculateIRRF(proposedBase));
      proposedRuleApplied = true;
    } else {
      // Fora da faixa de R$ 7.350, a regra especial não se aplica.
      // Para fins de comparação, mantemos o cálculo da regra atual.
      proposedIRRF = currentIRRF;
      proposedRuleApplied = false;
    }

    const difference = currentIRRF - proposedIRRF;

    setResult({
      grossSalary,
      currentIRRF,
      proposedIRRF,
      difference,
      proposedRuleApplied,
    });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg border-2 border-blue-100 my-8">
      <div className="mb-6 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Simulador de Impacto
        </h2>
        <p className="text-gray-500 text-sm">Regra Atual vs. Nova Proposta</p>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label
            htmlFor="ir26-salary"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Salário Bruto (R$)
          </label>
          <input
            type="text"
            id="ir26-salary"
            required
            placeholder="Ex: 3.500,00"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
            value={salaryStr}
            onChange={(e) => setSalaryStr(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ir26-dependents"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Número de Dependentes
            </label>
            <input
              type="number"
              id="ir26-dependents"
              min="0"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="ir26-alimony"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pensão Alimentícia (R$) <span className="text-xs">(Judicial)</span>
            </label>
            <input
              type="text"
              id="ir26-alimony"
              placeholder="Ex: 500,00"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
              value={alimonyStr}
              onChange={(e) => setAlimonyStr(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded hover:from-blue-700 hover:to-blue-800 transition-all shadow-md mt-4"
        >
          Simular Agora
        </button>
      </form>

      {result && (
        <div className="mt-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Card Regra Atual */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
              <h3 className="font-semibold text-gray-700 mb-2">
                Regra Atual (2025)
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                IRRF mensal estimado
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(result.currentIRRF)}
              </p>
            </div>

            {/* Card Nova Proposta */}
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl">
                Proposta PL 1087
              </div>
              <h3 className="font-semibold text-blue-800 mb-2">
                Nova Regra (2026)
              </h3>
              <p className="text-sm text-blue-600 mb-3">
                IRRF mensal estimado
              </p>
              <p className="text-3xl font-extrabold text-blue-700">
                {formatCurrency(result.proposedIRRF)}
              </p>
            </div>
          </div>

          {/* Resultado da Comparação */}
          <div className="text-center">
            {!result.proposedRuleApplied ? (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-yellow-800 text-sm">
                <strong>Atenção:</strong> O salário informado está acima do
                limite de R$ 7.350,00 previsto no PL. Portanto, a nova dedução
                especial não se aplica a este caso.
              </div>
            ) : result.difference > 0.01 ? (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm">
                <p className="text-green-800 font-medium mb-1">
                  Benefício da Nova Proposta:
                </p>
                <p className="text-xl font-bold text-green-700">
                  Você deixaria de pagar {formatCurrency(result.difference)} por
                  mês.
                </p>
                {result.proposedIRRF === 0 && (
                  <p className="text-sm text-green-600 mt-2 font-semibold">
                    ✨ Com a nova regra, você ficaria ISENTO de Imposto de Renda!
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg">
                <p className="text-gray-700">
                  Para este cenário, não haveria mudança significativa no valor
                  do imposto a pagar (ou você já é isento na regra atual).
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">
            *Cálculos baseados no texto inicial do PL 1087/2025 e nas tabelas
            vigentes.
          </p>
        </div>
      )}
    </div>
  );
}