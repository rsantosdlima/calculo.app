import type { Metadata } from "next";
import IRRF2026Calculator from "@/components/IRRF2026Calculator";

export const metadata: Metadata = {
  title: "Simulador IRRF 2026 (PL 1.087/2025) - Calculo.App.br",
  description: "Simule o impacto do Projeto de Lei 1.087/2025 no seu Imposto de Renda. Isenção até R$ 5.000.",
};

export default function Page() {
  return <IRRF2026Calculator />;
}
