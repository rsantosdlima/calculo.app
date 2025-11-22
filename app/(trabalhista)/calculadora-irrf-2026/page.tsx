import IRRF2026Calculator from "@/components/IRRF2026Calculator";
import AdSense from "@/components/AdSense";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Simulador IRRF 2026: Nova Isenção até R$ 5.000 (PL 1087/25)",
  description:
    "Calcule seu salário líquido com a proposta de isenção do Imposto de Renda. Entenda o PL 1087/2025, o desconto simplificado e a redução para a classe média.",
  keywords: [
    "IRRF 2026",
    "Isenção imposto de renda",
    "PL 1087/2025",
    "Simulador IR",
    "Reforma Tributária renda",
  ],
};

export default function IRRF2026Page() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase mb-3">
          Projeto de Lei 1.087/2025
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Nova Isenção do Imposto de Renda 2026
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Entenda como a proposta do Governo Federal altera o cálculo do IRRF,
          garantindo isenção efetiva para quem ganha até R$ 5.000 e reduzindo o
          imposto da classe média.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="prose lg:prose-lg text-gray-700 max-w-none">
          <p>
            O <strong>Projeto de Lei (PL) nº 1087/2025</strong> introduz uma
            mudança histórica na tributação da renda no Brasil. Em vez de apenas
            corrigir a tabela progressiva, o texto propõe um{" "}
            <strong>crédito redutor</strong> aplicado diretamente sobre o
            imposto devido.
          </p>
          <p>
            Na prática, isso significa que quem tem rendimentos tributáveis
            de até <strong>R$ 5.000,00</strong> ficará isento. 
            Para quem ganha acima disso, haverá um desconto gradual até o
            teto de R$ 7.350,00.
          </p>
        </div>

        {/* Alerta de Compliance */}
        <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-amber-600 mr-3 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide">
                Status: Em Tramitação
              </h3>
              <p className="text-sm text-amber-800 mt-1">
                Este simulador aplica as regras exatas descritas no texto enviado
                ao Congresso em outubro de 2025. A lei entra em vigor apenas
                após aprovação, com efeitos previstos para{" "}
                <strong>janeiro de 2026</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculadora */}
      <section id="calculadora" className="scroll-mt-8">
        <IRRF2026Calculator />
      </section>

      {/* Conteúdo Explicativo Rico */}
      <div className="mt-16 space-y-12">
        <section className="prose lg:prose-lg text-gray-700 max-w-none">
          <h2 className="text-3xl font-bold text-gray-900">
            Como funciona a "Nova Matemática" do IR?
          </h2>
          <p>
            Diferente das correções anteriores, onde o governo alterava as
            alíquotas (7,5%, 15%, etc.), o PL 1087/2025 mantém a estrutura
            atual, mas insere um <strong>passo extra</strong> no final da conta:
            a redução direta.
          </p>

          <div className="grid md:grid-cols-3 gap-6 not-prose mt-8">
            {/* Card 1 */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 font-bold text-xl">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Isenção Total</h3>
              <p className="text-sm text-gray-600">
                Para bases de cálculo até <strong>R$ 5.000,00</strong>. O
                sistema calcula o imposto e, em seguida, aplica um desconto
                exatamente igual ao valor devido, zerando a conta.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 font-bold text-xl">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Redução Gradual
              </h3>
              <p className="text-sm text-gray-600">
                Entre <strong>R$ 5.000,01 e R$ 7.350,00</strong>. O desconto
                diminui conforme o salário sobe. É uma "rampa" suave para
                evitar que um pequeno aumento salarial gere um grande imposto.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 mb-4 font-bold text-xl">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sem Alteração</h3>
              <p className="text-sm text-gray-600">
                Para rendimentos acima de <strong>R$ 7.350,00</strong>. Quem
                ganha acima desse teto continua pagando o IRRF conforme as
                regras vigentes, sem o benefício do redutor extra.
              </p>
            </div>
          </div>
        </section>

        {/* Middle Ad */}
        <div className="w-full flex justify-center">
          <AdSense slot="2405902567" format="auto" />
        </div>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Perguntas Frequentes sobre o Novo IR
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            <details className="group p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-gray-900 list-none">
                <span>O desconto simplificado de R$ 607,20 continua valendo?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                Sim. O novo redutor é aplicado <em>após</em> todas as deduções
                legais. Ou seja, primeiro o sistema desconta o INSS, dependentes
                e a opção mais vantajosa (Dedução Legal ou Desconto
                Simplificado), calcula o imposto base, e só então aplica a nova
                redução do PL 1087/25.
              </p>
            </details>

            <details className="group p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-gray-900 list-none">
                <span>
                  Como é calculada a redução na "Faixa de Transição"?
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                Para salários entre R$ 5.000,01 e R$ 7.350,00, o PL prevê uma
                fórmula específica:{" "}
                <strong>
                  Redução = 978,62 - (0,133145 × Rendimento Tributável)
                </strong>
                . Nossa calculadora aplica exatamente essa conta para determinar
                o valor do seu desconto.
              </p>
            </details>

            <details className="group p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-gray-900 list-none">
                <span>
                  As tabelas do INSS e IRRF atuais vão mudar?
                </span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                As tabelas do INSS serão atualizadas no início de 2026 com base
                no novo salário mínimo. A tabela progressiva do IRRF não tem
                previsão de mudança neste PL; a alteração é apenas na aplicação
                deste novo redutor. Consulte as{" "}
                <Link href="/tabelas-inss-irpf" className="text-blue-600 hover:underline">
                  Tabelas Vigentes
                </Link>{" "}
                para mais detalhes.
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}