"use client";

import { useState } from "react";
import {
  PercentageOperationType,
  PercentageCalculationResult,
  calculateIncrease,
  calculateDiscount,
  calculateDifference,
  calculateRepresentation,
} from "@/lib/percentage-calculations";

export default function PercentageCalculator() {
  const [operationType, setOperationType] =
    useState<PercentageOperationType>("increase");
  // Usamos strings para os inputs para facilitar a digitação de decimais com vírgula ou ponto
  const [value1Str, setValue1Str] = useState("");
  const [value2Str, setValue2Str] = useState("");
  const [result, setResult] = useState<PercentageCalculationResult | null>(
    null
  );

  // Helper para formatar moeda (R$)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Helper para formatar porcentagem com 6 casas decimais
  const formatPercentage6Decimals = (value: number) => {
    // Lida com Infinity/NaN se houver divisão por zero
    if (!isFinite(value)) return "Indefinido";
    
    return (
      new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(value) + "%"
    );
  };

  // Helper para converter string de input (pt-BR) para número
  const parseInputValue = (val: string) => {
    if (!val) return 0;
    // Remove pontos de milhar e troca vírgula decimal por ponto
    return parseFloat(val.replace(/\./g, "").replace(",", "."));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const val1 = parseInputValue(value1Str);
    const val2 = parseInputValue(value2Str);

    if (isNaN(val1) || isNaN(val2)) {
      alert("Por favor, insira valores numéricos válidos.");
      return;
    }

    let calculationResult: PercentageCalculationResult;

    switch (operationType) {
      case "increase":
        // val1 = Valor Inicial, val2 = Porcentagem
        calculationResult = calculateIncrease(val1, val2);
        break;
      case "discount":
        // val1 = Valor Inicial, val2 = Porcentagem
        calculationResult = calculateDiscount(val1, val2);
        break;
      case "difference":
        // val1 = Valor Inicial, val2 = Valor Final
        calculationResult = calculateDifference(val1, val2);
        break;
      case "representation":
        // val1 = Valor Total, val2 = Valor Parcial (Parte)
        calculationResult = calculateRepresentation(val1, val2);
        break;
    }

    setResult(calculationResult);
  };

  // Função para resetar resultado ao mudar o tipo de operação
  const handleTypeChange = (type: PercentageOperationType) => {
    setOperationType(type);
    setResult(null);
    // Opcional: limpar inputs também
    // setValue1Str("");
    // setValue2Str("");
  };

  // Define os labels dinamicamente com base na operação selecionada
  const getLabels = () => {
    switch (operationType) {
      case "increase":
        return {
          label1: "Valor Inicial (R$)",
          label2: "Percentual de Acréscimo (%)",
          placeholder2: "Ex: 10,555555",
        };
      case "discount":
        return {
          label1: "Valor Inicial (R$)",
          label2: "Percentual de Desconto (%)",
          placeholder2: "Ex: 5,25",
        };
      case "difference":
        return {
          label1: "Valor Inicial (R$)",
          label2: "Valor Final (R$)",
          placeholder2: "Ex: 150,00",
        };
      case "representation":
        return {
          label1: "Valor Total (R$)",
          label2: "Valor da Parte (R$)",
          placeholder2: "Ex: quanto X representa do total...",
        };
    }
  };

  const labels = getLabels();

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border border-blue-100 my-8">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Calculadora de Porcentagem
        </h2>

        {/* Menu Suspenso (Select) */}
        <label
          htmlFor="perc-operation"
          className="block text-sm font-bold text-gray-700 mb-2"
        >
          O que você deseja calcular?
        </label>
        <select
          id="perc-operation"
          className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 text-lg"
          value={operationType}
          onChange={(e) =>
            handleTypeChange(e.target.value as PercentageOperationType)
          }
        >
          <option value="increase">1. Calcular Acréscimo (+%)</option>
          <option value="discount">2. Calcular Desconto (-%)</option>
          <option value="difference">3. Diferença entre valores (Variação %)</option>
          <option value="representation">4. Representatividade (%)</option>
        </select>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input 1 Dinâmico */}
          <div>
            <label
              htmlFor="perc-val1"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              {labels.label1}
            </label>
            <input
              type="text"
              id="perc-val1"
              required
              placeholder="Ex: 100,00"
              className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
              value={value1Str}
              onChange={(e) => setValue1Str(e.target.value)}
            />
          </div>

          {/* Input 2 Dinâmico */}
          <div>
            <label
              htmlFor="perc-val2"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              {labels.label2}
            </label>
            <input
              type="text"
              id="perc-val2"
              required
              placeholder={labels.placeholder2}
              className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
              value={value2Str}
              onChange={(e) => setValue2Str(e.target.value)}
            />
            {/* Dica para o usuário sobre as casas decimais */}
            {(operationType === "increase" || operationType === "discount") && (
              <p className="text-xs text-gray-500 mt-1">
                Aceita até 6 casas decimais de precisão.
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-md mt-6 text-lg"
        >
          Calcular
        </button>
      </form>

      {/* Área de Resultados Dinâmica */}
      {result && (
        <div className="mt-8 animate-in fade-in duration-500 bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">
            Resultado do Cálculo
          </h3>

          {/* Resultado: Acréscimo */}
          {result.type === "increase" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-gray-500">Valor do Acréscimo</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(result.increaseAmount)}
                  </p>
                  <p className="text-xs text-gray-500">
                    ({formatPercentage6Decimals(result.percentage)} de{" "}
                    {formatCurrency(result.initialValue)})
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-bold">
                    Montante Final (Valor + Acréscimo)
                  </p>
                  <p className="text-2xl font-extrabold text-blue-800">
                    {formatCurrency(result.finalValue)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resultado: Desconto */}
          {result.type === "discount" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-red-100">
                  <p className="text-sm text-gray-500">Valor do Desconto</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(result.discountAmount)}
                  </p>
                  <p className="text-xs text-gray-500">
                    ({formatPercentage6Decimals(result.percentage)} de{" "}
                    {formatCurrency(result.initialValue)})
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 font-bold">
                    Montante Final (Valor - Desconto)
                  </p>
                  <p className="text-2xl font-extrabold text-green-800">
                    {formatCurrency(result.finalValue)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Resultado: Diferença (Variação) */}
          {result.type === "difference" && (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">
                Variação de {formatCurrency(result.initialValue)} para{" "}
                {formatCurrency(result.finalValue)}:
              </p>
              <div
                className={`inline-block p-6 rounded-full border-2 ${
                  result.percentageChange >= 0
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <p className="text-4xl font-extrabold">
                  {result.percentageChange > 0 ? "+" : ""}
                  {formatPercentage6Decimals(result.percentageChange)}
                </p>
              </div>
              <p className="text-gray-600 mt-4">
                Diferença absoluta:{" "}
                <strong>{formatCurrency(result.differenceAmount)}</strong>
              </p>
            </div>
          )}

          {/* Resultado: Representatividade */}
          {result.type === "representation" && (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                O valor de <strong>{formatCurrency(result.partialValue)}</strong>{" "}
                representa:
              </p>
              <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md inline-block">
                <p className="text-5xl font-extrabold">
                  {formatPercentage6Decimals(result.percentage)}
                </p>
              </div>
              <p className="text-gray-600 mt-4">
                do total de <strong>{formatCurrency(result.totalValue)}</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}