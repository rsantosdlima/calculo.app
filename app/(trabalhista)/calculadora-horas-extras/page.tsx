import OvertimeCalculator from "@/components/OvertimeCalculator";
import type { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Calculadora de horas extras online 2026 | Com reflexo no DSR',
  description: 'Calcule o valor exato das suas horas extras. Nossa calculadora considera o salário bruto, jornada mensal, porcentagem do adicional (50%, 100%) e o reflexo no DSR.',
}

export default function OvertimePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Calculadora de horas extras online: calcule o valor com DSR</h1>
      <div className="prose lg:prose-lg text-gray-700 mb-8">
        <p>A hora extra é um direito do trabalhador garantido pela CLT quando a jornada excedente é realizada. O cálculo envolve o valor da hora normal, o adicional (ex: 50% ou 100%) e o reflexo no Descanso Semanal Remunerado (DSR).</p>
      </div>
      <OvertimeCalculator />
      <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Como funciona o cálculo?</h2>
          <p>Primeiro, descobre-se o valor da hora normal dividindo o salário bruto pela jornada mensal (ex: 220h). Depois, aplica-se o adicional sobre esse valor. Por fim, soma-se o reflexo no DSR.</p>
        </section>
        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200 not-prose">
          <h3 className="text-xl font-bold text-gray-900 mb-3">O que é o reflexo no DSR?</h3>
          <p className="text-gray-800">As horas extras habituais refletem no pagamento do descanso semanal (domingos e feriados). Nossa calculadora usa a estimativa padrão de 1/6 para este cálculo.</p>
        </section>
        <section>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Dúvidas frequentes</h2>
           <p><strong>Incide INSS e IR?</strong> Sim, o valor recebido é salarial e sofre descontos. O resultado aqui é o valor <strong>bruto</strong>.</p>
           <p className="mt-4">Confira as alíquotas em nossas <Link href="/tabelas-inss-irpf" className="text-blue-600 hover:underline">Tabelas de INSS e IRPF 2026</Link>.</p>
        </section>
      </div>
    </main>
  );
}
