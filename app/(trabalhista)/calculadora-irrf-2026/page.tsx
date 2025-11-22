import IRRF2026Calculator from "@/components/IRRF2026Calculator";
import AdSense from "@/components/AdSense";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulação de IRRF 2026 | Nova tabela proposta (PL 1087/2025)',
  description: 'Simule como ficaria seu Imposto de Renda em 2026 com a proposta do governo (PL 1087/2025). Veja a nova faixa de isenção e as alíquotas reduzidas.',
}

export default function IRRF2026Page() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Simulação de IRRF 2026: nova tabela proposta</h1>
      
      {/* Top Ad */}
      <AdSense slot="2405902567" className="my-8" format="auto" />

      <div className="prose lg:prose-lg text-gray-700 mb-8">
        <p>
          O governo federal apresentou uma proposta de reforma do Imposto de Renda (através do Projeto de Lei 1087/2025) que promete alterações significativas para o ano-calendário de 2026. O objetivo principal é ampliar a faixa de isenção e reduzir a carga tributária para as classes média e baixa.
        </p>
        <p>
          Utilize nossa calculadora abaixo para simular como ficaria o seu desconto de IRRF caso essa proposta seja aprovada exatamente como está.
        </p>
      </div>
        
      <IRRF2026Calculator />

      <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
        
        <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 not-prose">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Atenção: Esta é uma Simulação</h3>
          <p className="text-gray-800">
            Os cálculos realizados nesta página são baseados em um <strong>Projeto de Lei (PL 1087/2025)</strong> que ainda está em tramitação no Congresso Nacional. As regras, faixas e alíquotas <strong>não estão em vigor</strong> e podem sofrer alterações antes da aprovação final. Utilize esta ferramenta apenas para fins de planejamento e comparação.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">O que muda com a proposta?</h2>
          <p>As principais mudanças sugeridas no texto do projeto são:</p>
          <ul>
              <li><strong>Aumento da Isenção:</strong> A faixa de isenção do IRRF subiria consideravelmente, beneficiando milhões de contribuintes que hoje pagam imposto.</li>
              <li><strong>Novas Faixas e Alíquotas:</strong> A estrutura da tabela progressiva seria reformulada, com a introdução de alíquotas intermediárias mais baixas para suavizar a transição entre as faixas de renda.</li>
              <li><strong>Redutor Específico:</strong> A proposta introduz um mecanismo de "redutor" fixo ou variável dependendo da faixa salarial, funcionando como um desconto adicional direto no imposto devido.</li>
          </ul>
        </section>

        {/* Middle Ad - Corrigido (fora do parágrafo) */}
        <AdSense slot="2405902567" className="my-8" format="auto" />

        <section>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Exemplo Prático (Comparativo)</h2>
           <p>Para um salário bruto de R$ 4.500,00 (sem dependentes):</p>
           <ul>
               <li><strong>Regra Atual (2025):</strong> O desconto de IRRF seria de aproximadamente R$ 150,00 a R$ 200,00 (dependendo da opção pelo desconto simplificado).</li>
               <li><strong>Proposta 2026:</strong> Com a nova tabela e o redutor aplicado, o desconto poderia cair para zero (isenção) ou um valor muito inferior, como R$ 30,00, representando um ganho líquido mensal significativo.</li>
           </ul>
           <p>Faça sua própria simulação acima para ver o impacto no seu salário específico.</p>
        </section>
      </div>
    </main>
  );
}