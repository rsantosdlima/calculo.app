"use client";

import { useState } from "react";
import { calculateAnticipation, AnticipationResult } from "@/lib/anticipation-calculations";

export default function AnticipationCalculator() {
  const [amountStr, setAmountStr] = useState("500,00");
  const [rateStr, setRateStr] = useState("12,0"); // Taxa CET anual
  const [quantityStr, setQuantityStr] = useState("10");
  const [strategy, setStrategy] = useState<"beginning" | "end">("beginning");
  const [totalRemainingStr, setTotalRemainingStr] = useState("60");
  
  const [result, setResult] = useState<AnticipationResult | null>(null);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const formatPercent = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 2 }).format(val/100);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountStr.replace(/\./g, "").replace(",", ".")) || 0;
    const rate = parseFloat(rateStr.replace(",", ".")) || 0;
    const quantity = parseInt(quantityStr) || 0;
    const totalRemaining = parseInt(totalRemainingStr) || 0;

    if (amount <= 0 || rate <= 0 || quantity <= 0) {
      alert("Preencha os valores corretamente.");
      return;
    }

    if (strategy === "end") {
      if (totalRemaining < quantity) {
        alert("O total de parcelas restantes não pode ser menor que a quantidade a antecipar.");
        return;
      }
    }

    const res = calculateAnticipation({
      installmentValue: amount,
      annualRate: rate,
      quantityToPay: quantity,
      strategy,
      totalRemaining
    });

    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculadora de Antecipação (Desconto)</h2>
      
      <form onSubmit={handleCalculate} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Valor da Parcela (R$)</label>
            <input 
              type="text" required
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900 text-lg"
              value={amountStr} onChange={(e) => setAmountStr(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Taxa de Juros Anual (CET %)
            </label>
            <input 
              type="text" required placeholder="Ex: 18.5"
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={rateStr} onChange={(e) => setRateStr(e.target.value)} 
            />
            <p className="text-xs text-gray-500 mt-1">Consulte o contrato (Custo Efetivo Total).</p>
          </div>

          <div className="md:col-span-2">
             <label className="block text-sm font-bold text-gray-700 mb-3">Qual parcelas você quer pagar?</label>
             <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setStrategy("beginning")}
                  className={`p-3 rounded-lg border text-center text-sm font-medium transition-all ${
                    strategy === "beginning"
                      ? "bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  As Próximas (Quitação)
                </button>
                <button
                  type="button"
                  onClick={() => setStrategy("end")}
                  className={`p-3 rounded-lg border text-center text-sm font-medium transition-all ${
                    strategy === "end"
                      ? "bg-green-50 border-green-500 text-green-800 ring-1 ring-green-500"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  As Últimas (Trás pra frente)
                </button>
             </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Quantas parcelas vai pagar?</label>
            <input 
              type="number" required min="1"
              className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={quantityStr} onChange={(e) => setQuantityStr(e.target.value)} 
            />
          </div>

          {strategy === "end" && (
            <div className="animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Total de parcelas restantes</label>
              <input 
                type="number" required min="1"
                className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
                value={totalRemainingStr} onChange={(e) => setTotalRemainingStr(e.target.value)} 
              />
              <p className="text-xs text-gray-500 mt-1">Quantas faltam para acabar o contrato hoje?</p>
            </div>
          )}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-all shadow-md text-lg">
          Calcular Desconto
        </button>
      </form>

      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gray-900 text-white p-6 rounded-t-xl text-center">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Valor para Quitar Agora</p>
            <p className="text-4xl font-bold text-green-400">{formatCurrency(result.amountToPay)}</p>
          </div>

          <div className="border border-gray-200 border-t-0 rounded-b-xl p-6 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Valor Original</p>
               <p className="text-lg font-semibold text-gray-700 line-through opacity-70">{formatCurrency(result.originalTotal)}</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Economia Real</p>
               <p className="text-xl font-bold text-green-600">{formatCurrency(result.totalDiscount)}</p>
             </div>
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold">Desconto (%)</p>
               <p className="text-lg font-bold text-green-700">{formatPercent(result.discountPercentage)}</p>
             </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800 flex items-start">
             <span className="text-xl mr-2">💡</span>
             <p>
               <strong>Dica:</strong> {strategy === 'end' 
                 ? "Antecipar as últimas parcelas gera o maior desconto possível pois você elimina juros de um futuro mais distante." 
                 : "Antecipar as próximas parcelas reduz o saldo devedor imediato, mas o desconto é menor do que pagar as últimas."}
             </p>
          </div>
        </div>
      )}
    </div>
  );
}