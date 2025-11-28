"use client";

import { useState } from "react";
import { calculateCommissionDSR, CommissionDSRResult } from "@/lib/labor-calculations";

export default function CommissionDSRCalculator() {
  const [baseSalaryStr, setBaseSalaryStr] = useState(""); // Novo Estado
  const [commissionStr, setCommissionStr] = useState("");
  const [businessDays, setBusinessDays] = useState("25");
  const [nonBusinessDays, setNonBusinessDays] = useState("5");
  const [result, setResult] = useState<CommissionDSRResult | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const baseSalary = parseFloat(baseSalaryStr.replace(/\./g, "").replace(",", ".")) || 0;
    const commission = parseFloat(commissionStr.replace(/\./g, "").replace(",", "."));
    const bDays = parseInt(businessDays);
    const nbDays = parseInt(nonBusinessDays);

    if (isNaN(commission) || isNaN(bDays) || isNaN(nbDays) || bDays <= 0) {
      alert("Por favor, preencha os campos obrigatórios corretamente.");
      return;
    }

    const res = calculateCommissionDSR(commission, bDays, nbDays, baseSalary);
    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 my-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
        Simulador de DSR sobre Comissões
      </h2>

      <form onSubmit={handleCalculate} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Salário Fixo (Novo) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Salário Fixo (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: 1.800,00"
              className="w-full rounded-md border-gray-300 p-3 focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900"
              value={baseSalaryStr}
              onChange={(e) => setBaseSalaryStr(e.target.value)}
            />
          </div>

          {/* Valor das Comissões */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Total de Comissões (R$)
            </label>
            <input
              type="text"
              required
              placeholder="Ex: 2.500,00"
              className="w-full rounded-md border-gray-300 p-3 focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900 font-medium"
              value={commissionStr}
              onChange={(e) => setCommissionStr(e.target.value)}
            />
          </div>
        </div>

        {/* Dias Úteis e Inúteis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Dias Úteis (Seg a Sáb)
            </label>
            <input
              type="number"
              required
              min="1"
              max="31"
              className="w-full rounded-md border-gray-300 p-3 focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900"
              value={businessDays}
              onChange={(e) => setBusinessDays(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Inclui sábados (salvo acordo contrário).
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Domingos e Feriados
            </label>
            <input
              type="number"
              required
              min="0"
              max="15"
              className="w-full rounded-md border-gray-300 p-3 focus:border-emerald-500 focus:ring-emerald-500 bg-white text-gray-900"
              value={nonBusinessDays}
              onChange={(e) => setNonBusinessDays(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Dias de descanso no mês.
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white font-bold py-4 rounded-lg hover:bg-emerald-700 transition-all shadow-md text-lg"
        >
          Calcular Remuneração Total
        </button>
      </form>

      {/* Resultados */}
      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl overflow-hidden">
            
            {/* Cabeçalho do Resultado */}
            <div className="p-6 text-center border-b border-emerald-100">
              <p className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-1">
                DSR Apurado
              </p>
              <p className="text-4xl font-extrabold text-emerald-600">
                {formatCurrency(result.dsrValue)}
              </p>
            </div>

            {/* Detalhes Separados */}
            <div className="p-6 bg-white">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-4">Composição da Remuneração</h4>
              <dl className="space-y-3 text-sm text-gray-700">
                
                {result.baseSalary > 0 && (
                  <div className="flex justify-between">
                    <span>Salário Fixo</span>
                    <span className="font-medium">{formatCurrency(result.baseSalary)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Comissões</span>
                  <span className="font-medium">{formatCurrency(result.commissionValue)}</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-medium bg-emerald-50 p-2 rounded">
                  <span>+ DSR sobre Comissões</span>
                  <span>{formatCurrency(result.dsrValue)}</span>
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-200 font-bold text-gray-900 text-lg items-end">
                  <span>Total Bruto</span>
                  <span className="text-2xl">{formatCurrency(result.totalValue)}</span>
                </div>
              </dl>
            </div>
          </div>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            * O valor total bruto serve de base para cálculo de INSS, IRRF, Férias e 13º Salário.
          </p>
        </div>
      )}
    </div>
  );
}