"use client";

import { useState, useEffect } from "react";
import { convertSalary, ConverterResult, SalaryPeriod } from "@/lib/salary-converter";

export default function SalaryConverter() {
  const [amountStr, setAmountStr] = useState("");
  const [period, setPeriod] = useState<SalaryPeriod>("month");
  const [result, setResult] = useState<ConverterResult | null>(null);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(val);

  useEffect(() => {
    const amount = parseFloat(amountStr.replace(/\./g, "").replace(",", "."));

    if (!isNaN(amount) && amount > 0) {
      const res = convertSalary({ amount, period });
      setResult(res);
    } else {
      setResult(null);
    }
  }, [amountStr, period]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 my-8">
      <div className="mb-6 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-900">Converter Salário</h2>
        <p className="text-gray-500 text-sm">Veja quanto seu salário rende por hora, dia ou o acumulado total no ano (Pacote CLT).</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Preencha os dados do seu ganho atual:
        </label>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <span className="text-gray-500 font-medium">Eu ganho</span>
          
          <div className="relative w-full md:w-48">
            <span className="absolute left-3 top-3 text-gray-500">R$</span>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg font-bold text-gray-900"
              placeholder="0,00"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </div>

          <span className="text-gray-500 font-medium">por</span>

          <select
            className="w-full md:w-40 py-3 px-4 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
            value={period}
            onChange={(e) => setPeriod(e.target.value as SalaryPeriod)}
          >
            <option value="month">Mês</option>
            <option value="hour">Hora</option>
            <option value="day">Dia</option>
            <option value="year">Ano</option>
          </select>
        </div>
      </div>

      {/* Resultados */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Equivalências Estimadas:</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card Hora */}
            <div className={`p-4 rounded-lg border ${period === 'hour' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' : 'bg-white border-gray-200'}`}>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Por Hora</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(result.hourly)}</p>
              <p className="text-xs text-gray-400 mt-2">Base 220h/mês</p>
            </div>

            {/* Card Dia */}
            <div className={`p-4 rounded-lg border ${period === 'day' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' : 'bg-white border-gray-200'}`}>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Por Dia</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{formatCurrency(result.daily)}</p>
              <p className="text-xs text-gray-400 mt-2">Base 30 dias</p>
            </div>

            {/* Card Mês */}
            <div className={`p-4 rounded-lg border ${period === 'month' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' : 'bg-white border-gray-200'}`}>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Por Mês</p>
              <p className="text-2xl font-extrabold text-blue-600 mt-1">{formatCurrency(result.monthly)}</p>
              <p className="text-xs text-gray-400 mt-2">Salário Bruto</p>
            </div>

            {/* Card Ano */}
            <div className={`p-4 rounded-lg border ${period === 'year' ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-200' : 'bg-white border-gray-200'}`}>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Anual</p>
              <p className="text-xl font-bold text-green-700 mt-1">{formatCurrency(result.yearly)}</p>
              <p className="text-xs text-gray-500 mt-2 font-medium bg-green-50 px-2 py-1 rounded inline-block">
                ~14,33 Salários
              </p>
            </div>
          </div>

          <div className="mt-6 bg-yellow-50 p-4 rounded-md border border-yellow-100 text-sm text-yellow-800 flex items-start">
            <span className="mr-2 text-lg">⚠️</span>
            <div>
              <p className="font-bold mb-1">O que está incluído no valor anual?</p>
              <p>
                Este cálculo projeta o ganho total de direitos no ano: <strong>12 Salários + 13º Salário + 1 Salário de Férias + 1/3 de Adicional</strong>.
              </p>
              <p className="mt-1 text-xs text-yellow-700 opacity-80">
                * Não inclui horas extras, DSR variável, comissões ou adicionais (noturno/insalubridade).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}