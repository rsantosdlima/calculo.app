import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import Link from "next/link";
import SalaryCalculator from "@/components/SalaryCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Salário Líquido 2025 | CLT e Descontos",
  description:
    "Calcule seu salário líquido com as novas tabelas de INSS e IRRF para 2025. Descubra exatamente quanto você vai receber após os descontos legais.",
};

export default function SalaryPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Calculadora de Salário Líquido 2025
      </h1>

      {/* Top Ad */}
      <AdSense slot="2405902567" className="my-8" format="auto" />

      <div className="prose lg:prose-lg text-gray-700 mb-8">
        <p>
          Utilize nossa calculadora gratuita para descobrir o valor exato do seu{" "}
          <strong>salário líquido</strong> em 2025. Nossa ferramenta já está
          atualizada com as novas faixas de contribuição do INSS e as regras do
          Imposto de Renda (IRRF) vigentes para este ano.
        </p>
        <p>
          Basta informar o salário bruto e os demais dados para ver o
          detalhamento de todos os descontos no seu holerite.
        </p>
      </div>

      <SalaryCalculator />

      <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Como é calculado o Salário Líquido?
          </h2>
          <p>
            O cálculo segue uma ordem específica de descontos obrigatórios por
            lei:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>INSS (Previdência Social):</strong> É o primeiro desconto,
              calculado sobre o salário bruto total. As alíquotas são
              progressivas (quem ganha mais, paga mais), variando de 7,5% a 14%,
              respeitando o teto máximo de contribuição.
            </li>
            <li>
              <strong>IRRF (Imposto de Renda):</strong> É calculado sobre a
              "base de cálculo", que é o Salário Bruto menos o INSS, menos o
              valor por dependente e menos a pensão alimentícia (se houver). O
              sistema também verifica se o "Desconto Simplificado" é mais
              vantajoso para você.
            </li>
            <li>
              <strong>Outros Descontos:</strong> Após os impostos oficiais, são
              subtraídos outros valores como vale-transporte, plano de saúde,
              etc.
            </li>
          </ol>
          <p className="mt-4 font-semibold">
            Salário Líquido = Salário Bruto - INSS - IRRF - Outros Descontos.
          </p>
        </section>

        {/* Middle Ad */}
        <AdSense slot="2405902567" className="my-8" format="auto" />

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200 not-prose shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Fique atento às Deduções do IRRF
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>
              <strong>Dependentes:</strong> Cada dependente legal (filhos,
              cônjuge, pais) reduz a base de cálculo do imposto em um valor fixo
              mensal.
            </li>
            <li>
              <strong>Pensão Alimentícia:</strong> O valor pago judicialmente é
              deduzido integralmente da base de cálculo do IRRF.
            </li>
            <li>
              <strong>Desconto Simplificado:</strong> Se a soma das suas
              deduções legais for baixa, a Receita Federal aplica automaticamente
              um desconto padrão simplificado se isso resultar em menos imposto
              para você. Nossa calculadora faz essa verificação automática.
            </li>
          </ul>
        </section>

        <section>
          <p>
            Quer entender melhor as alíquotas? Consulte nossa página com as{" "}
            <Link
              href="/tabelas-inss-irpf"
              className="text-blue-600 hover:underline font-medium"
            >
              Tabelas Oficiais do INSS e IRPF
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}