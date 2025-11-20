import type { Metadata } from "next";
import SalaryCalculator from "./Calculator";

export const metadata: Metadata = {
  title: "Calculadora de Salário Líquido 2025 - Calculo.App",
  description: "Calcule seu salário líquido com as deduções legais (INSS e Imposto de Renda) atualizados.",
};

export default function Page() {
  return <SalaryCalculator />;
}
