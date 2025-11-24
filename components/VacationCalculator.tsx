"use client";

import { useState, useEffect } from "react";
import { calculateVacation, VacationResult } from "@/lib/vacation-calculations";

export default function VacationCalculator() {
  // Estados do formulário
  const [salaryStr, setSalaryStr] = useState("");
  const [daysVacation, setDaysVacation] = useState<number>(30);
  const [sellDays, setSellDays] = useState(false);
  const [advance13th, setAdvance13th] = useState(false);
  const [dependents, setDependents] = useState("0");
  
  const [result, setResult] = useState<VacationResult | null>(null);

  // Efeito para garantir consistência: Se vender férias, o gozo máximo costuma ser 20 dias (para quem tem 30)
  useEffect(() => {
    if (sellDays && daysVacation > 20) {
      // Ajuste sugestivo para evitar erro comum, mas permitindo alteração manual se o usuário quiser simular cenários atípicos
      setDaysVacation(20);
    }
  }, [sellDays]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(salaryStr.replace(/\./g, "").replace(",", "."));
    
    if (isNaN(salary) || salary <= 0) {
      alert("Por favor, insira um salário válido.");
      return;
    }

    if (daysVacation < 5 || daysVacation > 30) {
      alert("Pela CLT, o período de férias deve ser entre 5 e 30 dias.");
      return;
    }

    const res = calculateVacation({
      grossSalary: salary,
      daysVacation: daysVacation,
      sellDays,
      advance13th,
      dependents: parseInt(dependents)
    });

    setResult(res);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 my-8">
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900">Simulador de Férias</h2>
        <p className="text-gray-500 text-sm">Descubra quanto você vai receber líquido no seu descanso.</p>
      </div>

      <form onSubmit={handleCalculate} className="space-y-6">
        {/* Salário */}
        <div>
          <label htmlFor="vac-salary" className="block text-sm font-bold text-gray-700 mb-2">
            Salário Bruto (R$)
          </label>
          <input
            type="text"
            id="vac-salary"
            required
            placeholder="Ex: 3.000,00"
            className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900 text-lg"
            value={salaryStr}
            onChange={(e) => setSalaryStr(e.target.value)}
          />
        </div>

        {/* Configurações de Dias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="vac-days" className="block text-sm font-bold text-gray-700 mb-2">
              Dias de descanso (Gozo)
            </label>
            <div className="relative">
              <input
                type="number"
                id="vac-days"
                min="5"
                max="30"
                required
                className="block w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                value={daysVacation}
                onChange={(e) => setDaysVacation(parseInt(e.target.value) || 0)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">dias</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Mínimo de 5 dias. Um dos períodos deve ter pelo menos 14 dias.
            </p>
          </div>
          
          <div>
            <label htmlFor="vac-dependents" className="block text-sm font-bold text-gray-700 mb-2">
              Dependentes (IRRF)
            </label>
            <input
              type="number"
              id="vac-dependents"
              min="0"
              className="block w-full rounded-md border-gray-300 p-3 bg-white text-gray-900"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
            />
          </div>
        </div>

        {/* Opções Extras (Checkboxes) */}
        <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              checked={sellDays}
              onChange={(e) => setSellDays(e.target.checked)}
            />
            <span className="ml-3 text-gray-700 font-medium">
              Vender 10 dias (Abono Pecuniário)
            </span>
          </label>
          {sellDays && (
             <p className="text-xs text-blue-600 ml-8 -mt-1 mb-2">
               * Ao vender 10 dias, você geralmente goza apenas 20 dias de férias.
             </p>
          )}

          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              checked={advance13th}
              onChange={(e) => setAdvance13th(e.target.checked)}
            />
            <span className="ml-3 text-gray-700 font-medium">Adiantar 1ª parcela do 13º</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all shadow-md text-lg"
        >
          Calcular Férias
        </button>
      </form>

      {/* Resultados */}
      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gray-900 text-white p-6 rounded-t-xl flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <div>
              <span className="uppercase tracking-wider text-xs font-semibold text-gray-400 block mb-1">Valor Líquido a Receber</span>
              <span className="text-3xl font-bold text-green-400">{formatCurrency(result.totalNet)}</span>
            </div>
            <div className="mt-4 sm:mt-0 text-right hidden sm:block">
              <span className="block text-xs text-gray-500">Referente a</span>
              <span className="text-sm font-medium text-gray-300">{daysVacation} dias de descanso</span>
            </div>
          </div>

          <div className="border border-gray-200 border-t-0 rounded-b-xl p-6 bg-gray-50 space-y-6">
            
            {/* Bloco de Proventos */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 border-b pb-1">Proventos (Entradas)</h3>
              <dl className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Valor das Férias ({daysVacation} dias)</span>
                  <span>{formatCurrency(result.grossVacation)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Adicional de 1/3 Constitucional</span>
                  <span>{formatCurrency(result.bonusOneThird)}</span>
                </div>
                
                {(result.allowanceAmount > 0) && (
                  <div className="flex justify-between text-blue-700 font-medium bg-blue-50 p-1 rounded">
                    <span>Abono Pecuniário (Venda 10 dias)</span>
                    <span>{formatCurrency(result.allowanceAmount)}</span>
                  </div>
                )}
                {(result.allowanceOneThird > 0) && (
                  <div className="flex justify-between text-blue-700 font-medium bg-blue-50 p-1 rounded">
                    <span>1/3 sobre Abono</span>
                    <span>{formatCurrency(result.allowanceOneThird)}</span>
                  </div>
                )}
                {(result.advance13thAmount > 0) && (
                  <div className="flex justify-between text-purple-700 font-medium bg-purple-50 p-1 rounded">
                    <span>Adiantamento 13º Salário</span>
                    <span>{formatCurrency(result.advance13thAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold pt-2 text-gray-900 border-t border-gray-200 mt-2">
                  <span>Total Bruto</span>
                  <span>{formatCurrency(result.totalGross)}</span>
                </div>
              </dl>
            </div>

            {/* Bloco de Descontos */}
            <div>
              <h3 className="text-sm font-bold text-red-500 uppercase mb-3 border-b pb-1">Descontos (Impostos)</h3>
              <dl className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between text-red-700">
                  <span>INSS (Previdência)</span>
                  <span>- {formatCurrency(result.inssValue)}</span>
                </div>
                <div className="flex justify-between text-red-700">
                  <span>IRRF (Imposto de Renda)</span>
                  <span>- {formatCurrency(result.irrfValue)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 text-gray-900 border-t border-gray-200 mt-2">
                  <span>Total de Descontos</span>
                  <span>- {formatCurrency(result.inssValue + result.irrfValue)}</span>
                </div>
              </dl>
            </div>

            <div className="text-xs text-gray-500 mt-4 text-center bg-white p-3 rounded border border-gray-200">
              <p><strong>Nota:</strong> O Abono Pecuniário e o Adiantamento do 13º são isentos de INSS e IRRF neste recibo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}