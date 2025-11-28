import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import CommissionDSRCalculator from "@/components/CommissionDSRCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de DSR sobre Comissão | Reflexo Descanso Semanal",
  description: "Calcule o valor do Descanso Semanal Remunerado (DSR) sobre suas comissões. Ferramenta online grátis atualizada com as regras da CLT.",
  keywords: ["calcular dsr comissão", "reflexo dsr comissões", "cálculo descanso semanal remunerado", "comissão dsr sábado", "tabela dsr"]
};

export default function CommissionDSRPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de DSR sobre Comissão
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Quem recebe comissão também tem direito ao pagamento dos dias de descanso. Use nossa calculadora para descobrir o valor exato do reflexo das comissões no seu DSR.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Calculadora */}
      <section id="calculadora">
        <CommissionDSRCalculator />
      </section>

      {/* Conteúdo Explicativo */}
      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como funciona o cálculo do DSR sobre comissão?</h2>
        <p>
          A Lei nº 605/1949 e a Súmula 27 do TST garantem que o comissionista (vendedor, representante, etc.) tem direito ao DSR calculado sobre as vendas realizadas no mês.
        </p>
        <p>
          A fórmula é simples, mas muitas empresas erram ou "esquecem" de pagar:
        </p>
        
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-6 not-prose font-mono text-sm md:text-base text-blue-900 text-center">
          DSR = (Total das Comissões ÷ Dias Úteis) × Domingos e Feriados
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Sábado conta como dia útil?</h3>
        <p>
          <strong>Sim.</strong> Para fins de cálculo trabalhista, o sábado é considerado dia útil não trabalhado (ou trabalhado meio período), a menos que haja uma Convenção Coletiva da sua categoria dizendo expressamente o contrário.
        </p>
        <ul className="list-disc pl-6 text-gray-800 space-y-2">
          <li><strong>Dias Úteis:</strong> Segunda a Sábado.</li>
          <li><strong>Descanso:</strong> Domingos e Feriados Nacionais/Locais.</li>
        </ul>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Reflexos em outras verbas</h3>
        <p>
          O valor do DSR pago sobre as comissões também entra na base de cálculo para:
        </p>
        <ul className="list-disc pl-6 text-gray-800">
          <li>FGTS</li>
          <li>Férias + 1/3</li>
          <li>13º Salário</li>
          <li>Aviso Prévio</li>
        </ul>

        <p className="mt-8 text-sm text-gray-500">
          Quer calcular também suas horas extras? Acesse nossa <Link href="/calculadora-horas-extras" className="text-blue-600 hover:underline">Calculadora de Horas Extras</Link>.
        </p>
      </div>
    </main>
  );
}