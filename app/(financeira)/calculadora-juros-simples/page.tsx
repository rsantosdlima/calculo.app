// CAMINHO: app/(financeira)/calculadora-juros-simples/page.tsx

// Importa o componente da calculadora que acabamos de corrigir
import SimpleInterestCalculator from "@/components/SimpleInterestCalculator";
import AdSense from "@/components/AdSense";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Calculadora de juros simples online | Simulador de rendimentos',
  description: 'Calcule rapidamente os juros simples de um investimento ou empréstimo. Informe o valor inicial, a taxa de juros e o período para ver o total de juros e o montante final.',
}

export default function SimpleInterestPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Calculadora de juros simples online</h1>
      
      {/* Top Ad */}
      <AdSense slot="2405902567" className="my-8" format="auto" />

      <div className="prose lg:prose-lg text-gray-700 mb-8">
        <p>O regime de juros simples é a forma mais básica de calcular rendimentos ou custos financeiros. Nele, a taxa de juros incide sempre sobre o <strong>valor principal (capital inicial)</strong>, e não sobre os juros acumulados em períodos anteriores.</p>
        <p>Esta calculadora é ideal para simular empréstimos entre pessoas físicas, descontos de títulos ou investimentos de curto prazo que não utilizam juros compostos.</p>
      </div>
        
      {/* AQUI ESTÁ O COMPONENTE SEPARADO */}
      <SimpleInterestCalculator />

      <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fórmula dos Juros Simples</h2>
          <p>O cálculo é feito usando a fórmula clássica:</p>
          <p className="text-xl font-mono bg-gray-100 p-4 rounded text-center border border-gray-200">J = C × i × t</p>
          <p>Onde:</p>
          <ul>
              <li><strong>J:</strong> Valor total dos Juros.</li>
              <li><strong>C:</strong> Capital inicial (valor principal investido ou emprestado).</li>
              <li><strong>i:</strong> Taxa de juros (em formato decimal, ex: 5% = 0.05).</li>
              <li><strong>t:</strong> Tempo (período da aplicação).</li>
          </ul>
          <p>Para encontrar o <strong>Montante Final (M)</strong>, ou seja, o valor total a ser resgatado ou pago, basta somar o capital inicial com os juros: <code>M = C + J</code>.</p>
        </section>

        {/* Middle Ad */}
        <AdSense slot="2405902567" className="my-8" format="auto" />

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200 not-prose">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Atenção às Unidades de Tempo</h3>
          <p className="text-gray-800">
            Para que o cálculo funcione corretamente, a <strong>taxa de juros</strong> e o <strong>tempo</strong> devem estar na mesma unidade.
          </p>
          <p className="text-gray-800 mt-2">
            Por exemplo, se a taxa for <strong>mensal</strong>, o tempo deve ser informado em <strong>meses</strong>. Se a taxa for anual e o tempo em meses, é necessário converter a taxa ou o tempo antes de aplicar a fórmula. Nossa calculadora faz essas conversões automaticamente para você quando as opções de período são selecionadas.
          </p>
        </section>

        <section>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Diferença para Juros Compostos</h2>
           <p>A principal diferença é que nos juros simples o rendimento é constante. Se você investe R$ 1.000 a 1% ao mês, ganhará R$ 10,00 no primeiro mês, R$ 10,00 no segundo, e assim por diante.</p>
           <p>Nos <strong>juros compostos</strong> (juros sobre juros), o rendimento cresce exponencialmente. No segundo mês, o 1% incidiria sobre R$ 1.010, gerando R$ 10,10, e assim sucessivamente. A maioria das aplicações financeiras e dívidas bancárias (cartão de crédito, financiamentos) utiliza juros compostos.</p>
        </section>
      </div>
    </main>
  );
}