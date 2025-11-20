import type { Metadata } from "next";
import SalaryCalculator from "./Calculator";

export const metadata: Metadata = {
  title: "Calculadora de Salário Líquido 2025 - Calculo.App.br",
  description: "Calcule seu salário líquido com os descontos atualizados de INSS e Imposto de Renda (IRRF 2025).",
};

export default function Page() {
  return <SalaryCalculator />;
}
