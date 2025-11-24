"use client";

import { useState, useEffect } from "react";
import {
  calculateTermination,
  TerminationResult,
  TerminationReason,
  NoticeType
} from "@/lib/termination-calculations";

export default function TerminationCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grossSalaryStr, setGrossSalaryStr] = useState("");
  const [dependents, setDependents] = useState("0");
  const [fgtsBalanceStr, setFgtsBalanceStr] = useState("0");
  
  const [reason, setReason] = useState<TerminationReason>("sem_justa_causa");
  const [noticeType, setNoticeType] = useState<NoticeType>("indenizado_empregador");
  const [noticeDaysNotWorked, setNoticeDaysNotWorked] = useState("30");
  const [vacationDueDays, setVacationDueDays] = useState("0"); // Número de dias

  const [result, setResult] = useState<TerminationResult | null>(null);

  // Lógica de Opções de Aviso baseada no Motivo
  useEffect(() => {
    if (reason === "pedido_demissao") {
      setNoticeType("trabalhado"); // Default para pedido
    } else if (reason === "sem_justa_causa") {
      setNoticeType("indenizado_empregador"); // Default para dispensa
    } else if (reason === "justa_causa" || reason === "termino_contrato") {
      setNoticeType("nao_aplicavel");
    }
  }, [reason]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(grossSalaryStr.replace(/\./g, "").replace(",", "."));
    const fgts = parseFloat(fgtsBalanceStr.replace(/\./g, "").replace(",", ".") || "0");
    const vDays = parseFloat(vacationDueDays) || 0;
    const nDaysNotWorked = parseFloat(noticeDaysNotWorked) || 0;

    if (isNaN(salary) || !startDate || !endDate) {
      alert("Preencha os campos obrigatórios corretamente.");
      return;
    }

    const res = calculateTermination({
      startDate,
      endDate,
      grossSalary: salary,
      dependents: parseInt(dependents),
      reason,
      noticeType,
      noticeDaysNotWorked: nDaysNotWorked,
      fgtsBalance: fgts,
      vacationDueDays: vDays
    });

    setResult(res);
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border border-blue-100 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dados da Rescisão</h2>
      
      <form onSubmit={handleCalculate} className="space-y-6">
        
        {/* Datas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Data de Admissão</label>
            <input type="date" required className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Data de Afastamento</label>
            <input type="date" required className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Salário Bruto (R$)</label>
            <input type="text" required placeholder="Ex: 4.500,00" className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={grossSalaryStr} onChange={(e) => setGrossSalaryStr(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Dependentes</label>
            <input type="number" min="0" className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={dependents} onChange={(e) => setDependents(e.target.value)} />
          </div>
        </div>

        {/* Motivo e Aviso (Lógica Dinâmica) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Motivo da Rescisão</label>
            <select className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
              value={reason} onChange={(e) => setReason(e.target.value as TerminationReason)}>
              <option value="sem_justa_causa">Dispensa sem Justa Causa</option>
              <option value="pedido_demissao">Pedido de Demissão</option>
              <option value="termino_contrato">Término de Contrato</option>
              <option value="acordo_mutuo">Acordo Comum</option>
              <option value="justa_causa">Demissão por Justa Causa</option>
            </select>
          </div>
          
          {reason !== "termino_contrato" && reason !== "justa_causa" && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Aviso Prévio</label>
              <select className="w-full border-gray-300 rounded-md p-3 bg-white text-gray-900"
                value={noticeType} onChange={(e) => setNoticeType(e.target.value as NoticeType)}>
                
                <option value="trabalhado">Trabalhado</option>
                
                {/* Só exibe opção de indenizar SE não for pedido de demissão */}
                {reason !== "pedido_demissao" && (
                  <option value="indenizado_empregador">Indenizado (Empresa paga)</option>
                )}

                {/* Opções de não cumprimento/dispensa */}
                <option value="indenizado_empregado">Não cumprido (Descontar)</option>
                <option value="dispensado">Dispensado (Não paga/Não desconta)</option>
              </select>
            </div>
          )}
        </div>

        {/* Campo condicional para dias não cumpridos */}
        {noticeType === "indenizado_empregado" && (
           <div className="bg-red-50 p-4 rounded-md border border-red-200 animate-in fade-in">
             <label className="block text-sm font-bold text-red-800 mb-2">Quantos dias não foram cumpridos?</label>
             <div className="flex items-center">
               <input type="number" min="1" max="30" className="w-24 border-red-300 rounded-md p-2 bg-white text-gray-900"
                 value={noticeDaysNotWorked} onChange={(e) => setNoticeDaysNotWorked(e.target.value)} />
               <span className="ml-3 text-sm text-red-700">Dias a serem descontados do salário</span>
             </div>
           </div>
        )}

        {/* Extras */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Saldo FGTS (Fins Rescisórios)</label>
              <input type="text" placeholder="0,00" className="w-full border-gray-300 rounded-md p-2 bg-white text-gray-900"
                value={fgtsBalanceStr} onChange={(e) => setFgtsBalanceStr(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Férias Vencidas (Dias)</label>
              <div className="relative">
                <input type="number" min="0" max="60" placeholder="0" className="w-full border-gray-300 rounded-md p-2 bg-white text-gray-900"
                  value={vacationDueDays} onChange={(e) => setVacationDueDays(e.target.value)} />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-xs">dias</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Ex: 30 (integral), 15 (parcial), etc.</p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-all shadow-md text-lg">
          Calcular Rescisão
        </button>
      </form>

      {/* RESULTADOS */}
      {result && (
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gray-900 text-white p-6 rounded-t-xl text-center">
            <span className="uppercase tracking-wider text-sm font-semibold text-gray-400">Total Líquido a Receber</span>
            <p className="text-4xl font-bold text-green-400 mt-2">{formatCurrency(result.totalNet)}</p>
          </div>

          <div className="border border-gray-200 border-t-0 rounded-b-xl bg-white overflow-hidden">
            {/* Tabela de Proventos */}
            <div className="p-6 bg-green-50/30">
              <h3 className="text-green-800 font-bold uppercase text-sm mb-4 border-b border-green-100 pb-2">Proventos (Ganhos)</h3>
              <div className="space-y-3 text-sm text-gray-800">
                <Row label={`Saldo de Salário (${result.daysWorkedBalance} dias)`} value={result.salaryBalance} />
                <Row label={`13º Salário Proporcional (${result.months13th}/12 avos)`} value={result.thirteenthProportional} />
                <Row label={`Férias Proporcionais (${result.monthsVacation}/12 avos)`} value={result.vacationProportional} />
                {result.vacationExpired > 0 && <Row label="Férias Vencidas" value={result.vacationExpired} />}
                <Row label="1/3 Constitucional de Férias" value={result.vacationOneThird} />
                {result.noticeAmount > 0 && <Row label={`Aviso Prévio Indenizado (${result.noticeDays} dias)`} value={result.noticeAmount} />}
                <Row label="Multa do FGTS" value={result.fgtsFine} />
              </div>
              <div className="mt-4 pt-3 border-t border-green-200 flex justify-between font-bold text-green-900">
                <span>Total de Proventos</span>
                <span>{formatCurrency(result.totalEarnings)}</span>
              </div>
            </div>

            {/* Tabela de Descontos */}
            <div className="p-6 bg-red-50/30 border-t border-gray-100">
              <h3 className="text-red-800 font-bold uppercase text-sm mb-4 border-b border-red-100 pb-2">Descontos</h3>
              <div className="space-y-3 text-sm text-gray-800">
                <Row label="INSS (Salário)" value={result.inssSalary} isDiscount />
                <Row label="INSS (13º Salário)" value={result.inss13th} isDiscount />
                <Row label="IRRF (Salário)" value={result.irrfSalary} isDiscount />
                <Row label="IRRF (13º Salário)" value={result.irrf13th} isDiscount />
                {result.noticeCost > 0 && <Row label="Desconto de Aviso Prévio" value={result.noticeCost} isDiscount />}
              </div>
              <div className="mt-4 pt-3 border-t border-red-200 flex justify-between font-bold text-red-900">
                <span>Total de Descontos</span>
                <span>- {formatCurrency(result.totalDiscounts)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, isDiscount = false }: { label: string, value: number, isDiscount?: boolean }) {
  if (value <= 0.01) return null;
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={isDiscount ? "text-red-700 font-medium" : "text-gray-900 font-medium"}>
        {isDiscount ? "- " : ""}{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)}
      </span>
    </div>
  );
}