import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import SalaryConverter from "@/components/SalaryConverter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conversor de Salário Online | Hora, Dia, Mês e Anual (Pacote CLT)",
  description: "Descubra seu ganho anual real (14,33 salários) e o valor da hora de trabalho. Ferramenta essencial para avaliar propostas CLT vs PJ.",
  keywords: ["conversor de salário", "salário anual clt", "quanto ganho por hora", "comparar clt pj", "cálculo valor hora"]
};

export default function SalaryConverterPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Conversor de Salário
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Transforme seu salário mensal em valor por hora, dia ou veja o <strong>ganho anual total</strong> (Pacote Completo). Ferramenta essencial para quem quer avaliar propostas ou mudar de regime.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Calculadora */}
      <section id="calculadora">
        <SalaryConverter />
      </section>

      {/* Conteúdo Explicativo SEO */}
      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">O cálculo do Salário Anual CLT</h2>
        <p>
          Ao contrário do que muitos pensam, para saber quanto você realmente ganha por ano na CLT, não basta multiplicar o salário por 12. Você acumula direitos que somam, em média, <strong>14,33 salários por ano</strong>.
        </p>
        <p>Nosso conversor considera a soma de:</p>
        <ul className="list-disc pl-6 text-gray-800">
          <li><strong>12 Salários Mensais:</strong> O pagamento padrão.</li>
          <li><strong>13º Salário:</strong> Um salário extra garantido por lei.</li>
          <li><strong>Férias (1 Salário):</strong> O valor referente ao mês de descanso (que é um direito adquirido pelo trabalho).</li>
          <li><strong>Adicional de Férias (1/3):</strong> O bônus constitucional sobre as férias.</li>
        </ul>
        
        <div className="bg-green-50 p-4 rounded border-l-4 border-green-500 text-green-800 font-medium mt-4">
          <p>Total: 12 + 1 + 1 + 0,33 = <strong>14,33 Salários/Ano</strong></p>
        </div>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Pensando em virar PJ?</h3>
        <p>
          Se você está avaliando migrar para o modelo PJ (Pessoa Jurídica), use o valor <strong>ANUAL</strong> desta calculadora como sua base mínima de negociação.
        </p>
        <p>
          Como PJ, você geralmente fatura apenas 12 notas fiscais no ano. Portanto, para não ter prejuízo financeiro na troca, sua proposta PJ anual deve ser igual ou superior ao valor "Total Anual" apresentado aqui (além de cobrir custos como contador e impostos).
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Valor da Hora Técnica</h3>
        <p>
          Para a jornada padrão de 44 horas semanais, a lei estabelece o divisor de <strong>220 horas mensais</strong>. O cálculo da sua hora base é feito dividindo o salário bruto mensal por 220.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          * Nota: Os valores apresentados são brutos. Para ver os descontos mensais, use nossa <Link href="/calculadora-salario-liquido" className="text-blue-600 hover:underline">Calculadora de Salário Líquido</Link>.
        </p>
      </div>
    </main>
  );
}