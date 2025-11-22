import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import PercentageCalculator from "@/components/PercentageCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Porcentagem Online | Acréscimo, Desconto e Variação",
  description:
    "Calcule porcentagem online de forma fácil. Ferramenta com 6 casas decimais para calcular acréscimos, descontos, diferença entre valores e representatividade.",
  keywords: [
    "calculadora de porcentagem",
    "calcular acréscimo percentual",
    "calcular desconto percentual",
    "variação percentual",
    "como calcular porcentagem",
  ],
};

export default function PercentagePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Porcentagem
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Realize cálculos percentuais com alta precisão (6 casas decimais).
          Calcule aumentos, descontos, variações entre preços e a
          representatividade de um valor sobre o total.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Conteúdo Explicativo (Conceituação) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="prose lg:prose-lg text-gray-700 max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            O que é Porcentagem?
          </h2>
          <p>
            A porcentagem (representada pelo símbolo <strong>%</strong>) é uma
            forma de expressar uma proporção ou uma fração em relação a uma base
            de 100. É uma medida universalmente usada para comparar grandezas,
            calcular taxas de juros, descontos em lojas, aumentos salariais e
            variações estatísticas.
          </p>
          <p>
            Dizer que algo é "10%" (dez por cento) é o mesmo que dizer que ele
            representa 10 partes de um total de 100 partes (ou a fração 10/100,
            que equivale a 0,10).
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
            Por que a precisão de 6 casas decimais é importante?
          </h3>
          <p>
            Em cálculos do dia a dia, duas casas decimais costumam ser
            suficientes. No entanto, em <strong>cálculos financeiros</strong>{" "}
            (como juros compostos de longo prazo), contábeis ou científicos,
            pequenas frações percentuais podem resultar em grandes diferenças
            no valor final. Nossa calculadora oferece 6 casas de precisão para
            garantir resultados exatos mesmo em cenários complexos.
          </p>
        </div>
      </div>

      {/* Componente da Calculadora */}
      <section id="calculadora" className="scroll-mt-8">
        <PercentageCalculator />
      </section>

      {/* Middle Ad */}
      <div className="w-full flex justify-center my-8">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Seção Explicativa das Funções */}
      <div className="mt-12 space-y-8">
        <section className="prose lg:prose-lg text-gray-700 max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Entenda as 4 funções desta calculadora
          </h2>

          <div className="grid md:grid-cols-2 gap-6 not-prose">
            {/* Função 1: Acréscimo */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 flex items-center mb-3">
                <span className="bg-blue-200 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  1
                </span>
                Acréscimo / Aumento
              </h3>
              <p className="text-sm text-blue-800">
                Ideal para calcular reajustes de preços, aumentos salariais ou
                multas. Você informa o valor original e a porcentagem que deseja
                adicionar. A ferramenta mostra o valor do aumento e o novo total.
              </p>
              <p className="text-xs text-blue-600 mt-2 font-mono bg-blue-100 p-2 rounded">
                Ex: R$ 100 + 10% = R$ 110 (Aumento de R$ 10)
              </p>
            </div>

            {/* Função 2: Desconto */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="font-bold text-green-900 flex items-center mb-3">
                <span className="bg-green-200 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  2
                </span>
                Desconto
              </h3>
              <p className="text-sm text-green-800">
                Use para calcular promoções, abatimentos em pagamentos à vista
                ou redução de custos. Informe o preço original e a % de
                desconto para saber quanto você economiza e o preço final.
              </p>
              <p className="text-xs text-green-600 mt-2 font-mono bg-green-100 p-2 rounded">
                Ex: R$ 100 - 20% = R$ 80 (Desconto de R$ 20)
              </p>
            </div>

            {/* Função 3: Diferença */}
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h3 className="font-bold text-purple-900 flex items-center mb-3">
                <span className="bg-purple-200 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  3
                </span>
                Diferença entre Valores (Variação)
              </h3>
              <p className="text-sm text-purple-800">
                Calcula a variação percentual entre um valor inicial e um valor
                final. Útil para comparar a evolução de preços, faturamento ou
                investimentos entre dois períodos.
              </p>
              <p className="text-xs text-purple-600 mt-2 font-mono bg-purple-100 p-2 rounded">
                Ex: De R$ 50 para R$ 75 = Aumento de +50%
              </p>
            </div>

            {/* Função 4: Representatividade */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="font-bold text-amber-900 flex items-center mb-3">
                <span className="bg-amber-200 text-amber-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  4
                </span>
                Representatividade (%)
              </h3>
              <p className="text-sm text-amber-800">
                Responde à pergunta: "Quanto o valor X representa do total Y?".
                Essencial para análises financeiras, como saber a fatia de um
                custo no orçamento total.
              </p>
              <p className="text-xs text-amber-600 mt-2 font-mono bg-amber-100 p-2 rounded">
                Ex: R$ 30 representa 15% de um total de R$ 200.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}