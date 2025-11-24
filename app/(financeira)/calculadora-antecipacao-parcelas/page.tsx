import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import AnticipationCalculator from "@/components/AnticipationCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Antecipação de Parcelas | Desconto Nubank/Inter",
  description: "Descubra quanto você economiza antecipando parcelas do financiamento, empréstimo ou cartão. Simule o desconto racional de pagar de trás pra frente.",
  keywords: ["antecipar parcelas", "desconto antecipação nubank", "calcular desconto quitação", "amortização de trás pra frente", "desconto racional"]
};

export default function AnticipationPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Antecipação
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Vai sobrar um dinheiro? Simule o desconto que você terá ao antecipar parcelas do seu financiamento ou empréstimo. Descubra se vale a pena pagar "de trás pra frente".
        </p>
      </header>

      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <section id="calculadora">
        <AnticipationCalculator />
      </section>

      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que antecipar gera desconto?</h2>
        <p>
          Quando você financia algo, paga juros pelo <strong>tempo</strong> que ficará com o dinheiro do banco. Se você devolve esse dinheiro antes do prazo (antecipa), o banco é obrigado pelo Código de Defesa do Consumidor a remover os juros proporcionais daquele período não utilizado.
        </p>
        <p>
          O cálculo utilizado é o do <strong>Valor Presente (Desconto Racional)</strong>. Basicamente, trazemos o valor futuro da parcela para o dia de hoje, descontando a taxa de juros do contrato.
        </p>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200 my-8 not-prose">
          <h3 className="font-bold text-green-900 text-lg mb-3">Estratégia: De trás pra frente</h3>
          <p className="text-sm text-green-800">
            Você já ouviu falar em "pagar a última parcela"? Essa estratégia é poderosa porque as últimas parcelas são as que têm mais juros acumulados (pois demorariam anos para serem pagas). Ao trazê-las para valor presente, o desconto é agressivo, muitas vezes reduzindo o valor da parcela pela metade ou mais.
          </p>
        </div>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Onde encontrar a taxa de juros?</h3>
        <p>
          Para o cálculo ser exato, você precisa da taxa <strong>CET (Custo Efetivo Total)</strong> mensal ou anual. Essa informação é obrigatória e deve constar no seu contrato de financiamento ou na fatura do cartão de crédito.
        </p>
        
        <p className="mt-8 text-sm text-gray-500">
          * A simulação considera uma taxa de juros constante. Em contratos antigos ou com índices variáveis (TR, IPCA), pode haver pequenas divergências.
        </p>
      </div>
    </main>
  );
}