import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import FinancingCalculator from "@/components/FinancingCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Simulador de Financiamento SAC e Price | Imóveis e Veículos",
  description: "Compare as tabelas SAC e Price. Simule seu financiamento imobiliário ou veicular e veja o valor das parcelas, juros totais e saldo devedor.",
  keywords: ["simulador financiamento", "tabela sac ou price", "calcular financiamento imobiliário", "juros habitacional", "simulação caixa"]
};

export default function FinancingPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Simulador de Financiamento
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Planejando comprar a casa própria ou um carro novo? Compare os sistemas <strong>SAC</strong> e <strong>Price</strong> e descubra qual opção gera a menor parcela ou o menor juro final.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <section id="calculadora">
        <FinancingCalculator />
      </section>

      {/* Conteúdo Explicativo */}
      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Qual a diferença entre SAC e Price?</h2>
        
        <div className="grid md:grid-cols-2 gap-8 not-prose mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-indigo-900 text-lg mb-3">Tabela SAC</h3>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Sistema de Amortização Constante.</strong> É o preferido nos financiamentos imobiliários no Brasil.
            </p>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
              <li>As parcelas começam mais altas e <strong>diminuem</strong> ao longo do tempo.</li>
              <li>Você paga a dívida (amortiza) de forma mais rápida.</li>
              <li>Geralmente resulta em <strong>menos juros totais</strong> no final do contrato.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-indigo-900 text-lg mb-3">Tabela Price</h3>
            <p className="text-sm text-gray-600 mb-3">
              <strong>Sistema Francês de Amortização.</strong> Muito comum em financiamentos de veículos e empréstimos pessoais.
            </p>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
              <li>As parcelas são <strong>fixas</strong> (iguais) do início ao fim.</li>
              <li>No começo, você paga mais juros e amortiza menos a dívida.</li>
              <li>A renda exigida para aprovação costuma ser menor, pois a parcela inicial é mais baixa que na SAC.</li>
            </ul>
          </div>
        </div>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Dica de Ouro: Amortização Extra</h3>
        <p>
          Independente do sistema escolhido, você pode economizar muito dinheiro fazendo <strong>amortizações extraordinárias</strong>. 
          Ao usar seu FGTS ou 13º salário para abater o saldo devedor, você elimina os juros compostos incidentes sobre aquele valor, reduzindo o prazo ou o valor das parcelas restantes.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          * Este simulador considera a taxa de juros efetiva (Custo Efetivo Total - CET) informada. Seguros (MIP/DFI) e taxas administrativas podem variar conforme o banco.
        </p>
      </div>
    </main>
  );
}