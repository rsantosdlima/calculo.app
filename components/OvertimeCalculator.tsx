"use client";

import { useState } from "react";
import { calculateOvertime, OvertimeResult } from "@/lib/labor-calculations";

export default function OvertimeCalculator() {
  const [grossSalaryStr, setGrossSalaryStr] = useState("");
  const [monthlyHours, setMonthlyHours] = useState("220");
  const [overtimePercentage, setOvertimePercentage] = useState("50");
  const [hoursWorked, setHoursWorked] = useState("");
  const [includeDSR, setIncludeDSR] = useState(true);
  const [result, setResult] = useState<OvertimeResult | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const salary = parseFloat(grossSalaryStr.replace(",", "."));
    const hoursMonth = parseFloat(monthlyHours);
    const percentage = parseFloat(overtimePercentage);
    const hoursDone = parseFloat(hoursWorked.replace(",", "."));

    if (
      isNaN(salary) ||
      isNaN(hoursMonth) ||
      isNaN(percentage) ||
      isNaN(hoursDone)
    ) {
      alert("Por favor, preencha os campos com valores numéricos válidos.");
      return;
    }

    const res = calculateOvertime(
      salary,
      hoursMonth,
      percentage,
      hoursDone,
      includeDSR
    );
    setResult(res);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 my-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
        Dados para o cálculo
      </h2>

      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Salário Bruto */}
          <div>
            <label
              htmlFor="ot-salary"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Salário Bruto (R$)
            </label>
            <input
              type="text"
              id="ot-salary"
              required
              placeholder="Ex: 3000,00"
              
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
              value={grossSalaryStr}
              onChange={(e) => setGrossSalaryStr(e.target.value)}
            />
          </div>

          {/* Jornada Mensal */}
          <div>
            <label
              htmlFor="ot-monthlyHours"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Jornada Mensal (Horas)
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="ot-monthlyHours"
                required
                
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 pr-12 bg-white text-gray-900 text-base md:text-sm"
                value={monthlyHours}
                onChange={(e) => setMonthlyHours(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">horas</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Padrão: 220h (44h semanais)
            </p>
          </div>

          {/* Porcentagem do Adicional */}
          <div>
            <label
              htmlFor="ot-percentage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Adicional de Hora Extra (%)
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id="ot-percentage"
                required
                
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 pr-12 bg-white text-gray-900 text-base md:text-sm"
                value={overtimePercentage}
                onChange={(e) => setOvertimePercentage(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Comum: 50% (dias úteis), 100% (domingos/feriados)
            </p>
          </div>

          {/* Quantidade de Horas Feitas */}
          <div>
            <label
              htmlFor="ot-hoursWorked"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantidade de Horas Extras
            </label>
            <input
              type="text"
              id="ot-hoursWorked"
              required
              placeholder="Ex: 10.5"
              
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900 text-base md:text-sm"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
            />
          </div>
        </div>

        {/* Checkbox DSR */}
        <div className="flex items-center">
          <input
            id="ot-dsr"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white"
            checked={includeDSR}
            onChange={(e) => setIncludeDSR(e.target.checked)}
          />
          <label htmlFor="ot-dsr" className="ml-2 block text-sm text-gray-900">
            Calcular reflexo no DSR (Descanso Semanal Remunerado)
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-md"
        >
          Calcular Horas Extras
        </button>
      </form>

      {/* Área de Resultados */}
      {result && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 animate-in fade-in duration-300 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            Resultado Detalhado
          </h3>

          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Valor da Hora Normal
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatCurrency(result.normalHourlyRate)}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Valor da Hora Extra ({overtimePercentage}%)
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {formatCurrency(result.overtimeHourlyRate)}
              </dd>
            </div>

            <div className="sm:col-span-2 border-t border-gray-100 pt-4">
              <dt className="text-sm font-medium text-gray-500">
                Subtotal Horas Extras ({hoursWorked}h)
              </dt>
              <dd className="mt-1 text-lg font-semibold text-blue-700">
                {formatCurrency(result.totalOvertimeValue)}
              </dd>
            </div>

            {includeDSR && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  Reflexo no DSR (Estimado 1/6)
                  <span
                    className="ml-2 text-xs text-gray-400 cursor-help"
                    title="Cálculo estimado baseado na razão padrão de 1/6 (um dia de descanso para cada seis trabalhados)."
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </dt>
                <dd className="mt-1 text-lg font-semibold text-blue-700">
                  {formatCurrency(result.dsrValue)}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-6 bg-white p-4 rounded-lg border border-blue-100 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
            <span className="text-lg font-bold text-gray-700 uppercase tracking-wide mb-2 sm:mb-0">
              Total a Receber (Bruto)
            </span>
            <span className="text-3xl font-extrabold text-blue-600">
              {formatCurrency(result.grandTotal)}
            </span>
          </div>
          <p className="text-xs text-gray-500 text-center sm:text-right">
            Sem descontos de INSS/IRPF sobre este valor.
          </p>
        </div>
      )}
    </div>
  );
}