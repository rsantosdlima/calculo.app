import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Juros Compostos Online | Simulador de Investimentos",
  description: "Simule o rendimento dos seus investimentos com aportes mensais. Veja o poder dos juros compostos no longo prazo para CDB, Poupança, Tesouro e Fundos.",
  keywords: ["juros compostos", "simulador de investimentos", "calcular rendimento poupança", "juros sobre juros", "calculadora financeira"]
};

export default function CompoundInterestPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Juros Compostos
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Planeje seu futuro financeiro. Simule quanto seu dinheiro pode render com a aplicação de juros sobre juros e aportes mensais constantes.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Calculadora */}
      <section id="calculadora">
        <CompoundInterestCalculator />
      </section>

      {/* Conteúdo Explicativo SEO */}
      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">A "Mágica" dos Juros Compostos</h2>
        <p>
          Albert Einstein teria chamado os juros compostos de "a oitava maravilha do mundo". A diferença fundamental para os juros simples é que, aqui, o rendimento do mês passado passa a render também no mês seguinte.
        </p>
        <p>
          Isso cria um efeito <strong>Exponencial</strong> (Bola de Neve). Nos primeiros anos, o crescimento parece lento (linear), mas após um período de maturação, os juros superam o valor dos seus próprios aportes.
        </p>

        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
            <h3 className="font-bold text-indigo-900 text-lg mb-2">Juros Simples</h3>
            <p className="text-sm text-indigo-800">
              R$ 10.000 a 10% ao ano.<br/>
              Ano 1: Ganha R$ 1.000<br/>
              Ano 2: Ganha R$ 1.000<br/>
              Ano 10: Ganha R$ 1.000<br/>
              <strong>Total Juros: R$ 10.000</strong>
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-900 text-lg mb-2">Juros Compostos</h3>
            <p className="text-sm text-green-800">
              R$ 10.000 a 10% ao ano.<br/>
              Ano 1: Ganha R$ 1.000<br/>
              Ano 2: Ganha R$ 1.100<br/>
              Ano 10: Ganha R$ 2.357<br/>
              <strong>Total Juros: ~R$ 15.937</strong> (59% a mais!)
            </p>
          </div>
        </div>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Onde investir para ganhar juros compostos?</h3>
        <ul className="list-disc pl-6 text-gray-800 space-y-2">
          <li><strong>Renda Fixa:</strong> CDBs, Tesouro Direto (Selic/IPCA), LCI/LCA. São investimentos onde o dinheiro "acumula" automaticamente.</li>
          <li><strong>Fundos Imobiliários e Ações:</strong> Embora paguem dividendos (que saem do valor da cota), se você <strong>reinvestir</strong> esses dividendos comprando mais cotas, você cria o efeito dos juros compostos manualmente.</li>
        </ul>

        <p className="mt-8 text-sm text-gray-500">
          * Nota: Esta calculadora considera uma taxa de juros constante e bruta (sem descontar imposto de renda sobre o lucro ou inflação).
        </p>
      </div>
    </main>
  );
}