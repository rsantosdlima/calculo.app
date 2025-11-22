// CAMINHO: app/(datas)/calculadora-dias-uteis/page.tsx

import WorkingDaysCalculator from "@/components/WorkingDaysCalculator";
import AdSense from "@/components/AdSense"; // <-- IMPORTANTE: Importar o componente de AdSense
import type { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Calculadora de dias úteis online (Brasil) | Considera feriados móveis',
  description: 'Calcule a quantidade exata de dias úteis entre duas datas. Nossa ferramenta desconta automaticamente sábados, domingos e feriados nacionais brasileiros, incluindo Carnaval e Corpus Christi.',
}

export default function WorkingDaysPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Calculadora de dias úteis online: considera feriados nacionais (Brasil)
      </h1>

      {/* --- ÁREA DE ANÚNCIO 1: TOPO (Horizontal) --- */}
      {/* Substitua 'slot' pelo ID do seu bloco de anúncio horizontal do AdSense */}
      <AdSense slot="SEU_SLOT_ID_HORIZONTAL_AQUI" className="my-8" format="auto" />

      <div className="prose lg:prose-lg text-gray-700 mb-8">
        <p>
          Calcular prazos corretamente é fundamental no Brasil, seja para pagamentos bancários, entregas de projetos ou contagem de férias. A principal dúvida costuma ser: devo contar dias corridos ou dias úteis?
        </p>
        <p>
          Enquanto os dias corridos consideram todos os dias do calendário, os <strong>dias úteis</strong> são aqueles movimentados comercialmente e financeiramente, excluindo os fins de semana (sábados e domingos) e os feriados oficiais. Nossa ferramenta abaixo faz esse cálculo automaticamente para você, garantindo precisão.
        </p>
      </div>
        
      {/* --- CALCULADORA --- */}
      <WorkingDaysCalculator />

      <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Por que usar uma calculadora automática?</h2>
          <p>
            Fazer a contagem manual olhando o calendário é trabalhoso e sujeito a erros. É fácil esquecer um feriado móvel como o Carnaval ou Corpus Christi, que mudam de data todo ano. 
          </p>
          <p>
            Nossa calculadora utiliza uma base de dados inteligente que sabe exatamente quando esses feriados caem em qualquer ano que você selecionar, entregando o resultado exato em segundos sem você precisar consultar calendários antigos ou futuros.
          </p>
        </section>

        {/* --- ÁREA DE ANÚNCIO 2: MEIO DO CONTEÚDO (Retângulo/Auto) --- */}
        {/* Substitua 'slot' pelo ID do seu bloco de anúncio do AdSense */}
        <AdSense slot="SEU_SLOT_ID_RETANGULO_AQUI" className="my-8" format="auto" />

        <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 not-prose">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Atenção importante: feriados locais</h3>
          <p className="text-gray-800 mb-2">
            Esta ferramenta considera exclusivamente os <strong>feriados nacionais</strong> do Brasil.
          </p>
          <p className="text-gray-800">
            Não são contabilizados feriados estaduais (como a Revolução Constitucionalista em SP) ou feriados municipais (como o aniversário da sua cidade). Para prazos muito específicos que dependam de órgãos locais, verifique sempre o calendário oficial da sua região.
          </p>
        </section>

        <section>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Dúvidas frequentes</h2>
           <div className="space-y-4">
               <div>
                   <h3 className="font-bold text-lg text-gray-800">Sábado conta como dia útil para pagamento?</h3>
                   <p>Para a maioria das transações bancárias e vencimentos de boletos no Brasil, não. O sábado é considerado dia não útil. Se um boleto vence no sábado, domingo ou feriado, o pagamento geralmente pode ser feito no próximo dia útil sem juros.</p>
               </div>
               <div>
                   <h3 className="font-bold text-lg text-gray-800">O dia da consciência negra (20 de novembro) é considerado?</h3>
                   <p>Sim. A partir de 2024, o Dia Nacional de Zumbi e da Consciência Negra tornou-se feriado nacional e nossa calculadora já considera essa data automaticamente no cálculo de dias úteis.</p>
               </div>
           </div>
        </section>
      </div>
    </main>
  );
}