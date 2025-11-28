import IRRF2026Calculator from "@/components/IRRF2026Calculator";
import AdSense from "@/components/AdSense";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // ATUALIZADO: Título e descrição refletindo a Lei sancionada
  title: "Simulador IRRF 2026: Isenção até R$ 5.000 (Lei 15.270/25)",
  description:
    "Calcule seu salário líquido com a nova Lei 15.270/2025. Veja a isenção do Imposto de Renda para quem ganha até R$ 5.000 e a tributação de lucros a partir de 2026.",
  keywords: [
    "IRRF 2026",
    "Lei 15.270/2025",
    "Isenção imposto de renda lei",
    "Simulador IR 2026",
    "Reforma Tributária renda",
  ],
};

export default function IRRF2026Page() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        {/* ATUALIZADO: Badge e Título */}
        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-semibold tracking-wide uppercase mb-3">
          Lei 15.270/2025 Publicada
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Nova Isenção do Imposto de Renda 2026
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Entenda como a nova lei sancionada pelo Governo Federal altera o cálculo do IRRF,
          garantindo isenção efetiva para quem ganha até R$ 5.000 e reduzindo o
          imposto da classe média a partir de janeiro de 2026.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="prose lg:prose-lg text-gray-700 max-w-none">
          <p>
            A <strong>Lei nº 15.270, de 27 de novembro de 2025</strong>, introduz uma
            mudança histórica na tributação da renda no Brasil. Em vez de apenas
            corrigir a tabela progressiva, o texto oficializa um{" "}
            <strong>crédito redutor</strong> aplicado diretamente sobre o
            imposto devido.
          </p>
          <p>
            Na prática, isso confirma que quem tem rendimentos tributáveis
            de até <strong>R$ 5.000,00</strong> ficará isento. 
            Para quem ganha acima disso, haverá um desconto gradual até o
            teto de R$ 7.350,00.
          </p>
        </div>

        {/* ATUALIZADO: Alerta de Status Sancionado */}
        <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-green-600 mr-3 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-bold text-green-900 uppercase tracking-wide">
                Status: Lei Sancionada
              </h3>
              <p className="text-sm text-green-800 mt-1">
                A lei foi assinada em 26/11/2025 e publicada no Diário Oficial em 27/11/2025.
                As novas regras de isenção e o desconto simplificado ampliado entram em vigor
                a partir de <strong>1º de janeiro de 2026</strong>.
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
            Como funciona a "Nova Matemática" da Lei 15.270?
          </h2>
          <p>
            A nova legislação mantém a estrutura de alíquotas atual (7,5% a 27,5%), 
            mas insere um <strong>passo extra</strong> no final da conta:
            a redução direta baseada no lucro e dividendos tributados.
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
                sistema calcula o imposto e aplica um desconto
                igual ao valor devido, zerando a conta.
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
                diminui conforme o salário sobe, criando uma transição suave.
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
                regras vigentes.
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
              Perguntas Frequentes sobre a Nova Lei
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            <details className="group p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-gray-900 list-none">
                <span>O desconto simplificado de R$ 607,20 continua valendo?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                Sim. O novo redutor da Lei 15.270 é aplicado <em>após</em> as deduções legais. 
                Primeiro calcula-se o imposto base (com deduções ou desconto simplificado), e só então aplica-se a nova redução.
              </p>
            </details>

            <details className="group p-6 cursor-pointer">
              <summary className="flex justify-between items-center font-medium text-gray-900 list-none">
                <span>Como é calculada a redução na "Faixa de Transição"?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p className="text-gray-600 mt-3 group-open:animate-fadeIn">
                Para salários entre R$ 5.000,01 e R$ 7.350,00, a lei estabelece a fórmula:
                <strong>Redução = 978,62 - (0,133145 × Rendimento Tributável)</strong>.
                Nossa calculadora já aplica essa fórmula oficial.
              </p>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}