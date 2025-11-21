import type { Metadata } from "next";
import SalaryCalculator from "../calculadora-salario-liquido/Calculator";

// We reuse the component but we might need to inject a "year" prop if we want to change logic.
// For now, since the user asked for "IRRF 2026" and the logic is the same (just different tables potentially),
// I will create a wrapper.
// Actually, the current Calculator reads tables from `lib/tax-tables`.
// To support 2026, I should add a "Year Selector" or a specific 2026 Calculator.
// I will make a copy of the Calculator component that uses "2026" tables (which I will define as 2025 + inflation or same).

export const metadata: Metadata = {
  title: "Simulador IRRF 2026 - Calculo.App.br",
  description: "Simule o Imposto de Renda 2026 com base nas projeções atuais.",
};

export default function Page() {
  return (
    <div className="space-y-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                        <strong>Atenção:</strong> A tabela oficial de 2026 ainda não foi divulgada.
                        Esta simulação utiliza a tabela vigente de 2025 como base.
                    </p>
                </div>
            </div>
        </div>
        <SalaryCalculator />
    </div>
  );
}
