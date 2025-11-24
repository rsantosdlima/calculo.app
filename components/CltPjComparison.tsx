"use client";

import { useState } from "react";
import { calculateCltPjComparison, ComparisonResult } from "@/lib/clt-pj-calculations";

export default function CltPjComparison() {
  // Inputs
  const [cltSalaryStr, setCltSalaryStr] = useState("");
  const [cltBenefitsStr, setCltBenefitsStr] = useState("0");
  const [pjBillingStr, setPjBillingStr] = useState("");
  const [pjAccountantStr, setPjAccountantStr] = useState("300"); // Custo médio contador online

  const [result, setResult] = useState<ComparisonResult | null>(null);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const formatPercent = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 2 }).format(val/100);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cltSalary = parseFloat(cltSalaryStr.replace(/\./g, "").replace(",", "."));
    const cltBenefits = parseFloat(cltBenefitsStr.replace(/\./g, "").replace(",", ".") || "0");
    const pjBilling = parseFloat(pjBillingStr.replace(/\./g, "").replace(",", "."));
    const pjAccountant = parseFloat(pjAccountantStr.replace(/\./g, "").replace(",", ".") || "0");

    if (isNaN(cltSalary) || isNaN(pjBilling)) {
      alert("Preencha os salários CLT e PJ para comparar.");
      return;
    }

    const res = calculateCltPjComparison({
      cltSalary,
      cltBenefits,
      pjMonthlyBilling: pjBilling,
      pjAccountantCost: pjAccountant
    });

    setResult(res);
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border border-blue-100 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        CLT vs PJ: Qual vale mais a pena?
      </h2>
      
      <form onSubmit={handleCalculate} className="space-y-8">
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Coluna CLT */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <h3 className="text-blue-900 font-bold text-lg mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center mr-2 text-xs">CLT</span>
              Carteira Assinada
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Salário Bruto Mensal</label>
                <input 
                  type="text" required placeholder="Ex: 5.000,00"
                  className="w-full border-gray-300 rounded-md p-2 focus:ring-blue-500 bg-white text-gray-900"
                  value={cltSalaryStr} onChange={(e) => setCltSalaryStr(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Benefícios Mensais (VR, Plano, etc)</label>
                <input 
                  type="text" placeholder="Ex: 800,00"
                  className="w-full border-gray-300 rounded-md p-2 focus:ring-blue-500 bg-white text-gray-900"
                  value={cltBenefitsStr} onChange={(e) => setCltBenefitsStr(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Some VR, VA e valor do Plano de Saúde.</p>
              </div>
            </div>
          </div>

          {/* Coluna PJ */}
          <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
            <h3 className="text-orange-900 font-bold text-lg mb-4 flex items-center">
              <span className="w-8 h-8 bg-orange-200 text-orange-800 rounded-full flex items-center justify-center mr-2 text-xs">PJ</span>
              Pessoa Jurídica
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Faturamento Mensal (Nota Fiscal)</label>
                <input 
                  type="text" required placeholder="Ex: 8.000,00"
                  className="w-full border-gray-300 rounded-md p-2 focus:ring-orange-500 bg-white text-gray-900"
                  value={pjBillingStr} onChange={(e) => setPjBillingStr(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Custo Mensal Contador</label>
                <input 
                  type="text" placeholder="300,00"
                  className="w-full border-gray-300 rounded-md p-2 focus:ring-orange-500 bg-white text-gray-900"
                  value={pjAccountantStr} onChange={(e) => setPjAccountantStr(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-all shadow-lg text-lg">
          Comparar Cenários
        </button>
      </form>

      {/* RESULTADOS */}
      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Vencedor */}
          <div className={`p-6 rounded-t-xl text-center text-white ${result.bestOption === 'PJ' ? 'bg-orange-600' : 'bg-blue-600'}`}>
            <p className="uppercase tracking-wide text-xs font-semibold opacity-90 mb-2">Melhor opção financeira</p>
            <p className="text-4xl font-extrabold mb-2">{result.bestOption} Vence</p>
            <p className="text-sm opacity-90">
              Diferença anual de <strong>{formatCurrency(Math.abs(result.differenceAnnual))}</strong> a favor do {result.bestOption}.
            </p>
          </div>

          <div className="border border-gray-200 border-t-0 rounded-b-xl bg-white overflow-hidden grid md:grid-cols-2">
            
            {/* Detalhe CLT */}
            <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
              <h4 className="font-bold text-blue-800 mb-4 uppercase text-sm">Raio-X CLT (Anual)</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Salário Líquido (12x)</span>
                  <span>{formatCurrency(result.clt.monthlyNet * 12)}</span>
                </li>
                <li className="flex justify-between text-blue-600">
                  <span>+ 13º e Férias (Líquidos)</span>
                  <span>{formatCurrency(result.clt.annualNet - (result.clt.monthlyNet * 12))}</span>
                </li>
                <li className="flex justify-between text-blue-600">
                  <span>+ FGTS (8%)</span>
                  <span>{formatCurrency(result.clt.fgtsAnnual)}</span>
                </li>
                <li className="flex justify-between text-blue-600">
                  <span>+ Benefícios (VR/Saúde)</span>
                  <span>{formatCurrency(result.clt.benefitsAnnual)}</span>
                </li>
                <li className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-100 text-base">
                  <span>Total Líquido Anual</span>
                  <span>{formatCurrency(result.clt.totalPackageAnnual)}</span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-4">
                * Média mensal real: <strong>{formatCurrency(result.clt.totalPackageAnnual / 12)}</strong>
              </p>
            </div>

            {/* Detalhe PJ */}
            <div className="p-6">
              <h4 className="font-bold text-orange-800 mb-4 uppercase text-sm">Raio-X PJ (Anual)</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between">
                  <span>Faturamento Bruto (12x)</span>
                  <span>{formatCurrency(result.pj.annualNet + result.pj.totalTaxAnnual + result.pj.totalExpensesAnnual)}</span>
                </li>
                <li className="flex justify-between text-red-500">
                  <span>- Impostos ({formatPercent(result.pj.taxRate)})</span>
                  <span>{formatCurrency(result.pj.totalTaxAnnual)}</span>
                </li>
                <li className="flex justify-between text-red-500">
                  <span>- Contador/Despesas</span>
                  <span>{formatCurrency(result.pj.totalExpensesAnnual)}</span>
                </li>
                <li className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-100 text-base">
                  <span>Total Líquido Anual</span>
                  <span>{formatCurrency(result.pj.annualNet)}</span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-4">
                * Média mensal real: <strong>{formatCurrency(result.pj.monthlyNet)}</strong>
              </p>
            </div>

          </div>
          
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-xs text-yellow-800">
            <p><strong>Nota:</strong> O cálculo PJ considera o regime Simples Nacional (Anexo III) que é comum para serviços. Não incluímos custos opcionais como INSS sobre pró-labore (aposentadoria) ou dias parados não remunerados.</p>
          </div>

        </div>
      )}
    </div>
  );
}