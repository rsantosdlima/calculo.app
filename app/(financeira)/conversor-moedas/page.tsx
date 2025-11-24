import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import CurrencyConverter from "@/components/CurrencyConverter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conversor de Moedas PTAX | Dólar, Euro, Libra e mais",
  description: "Converta as principais moedas mundiais (USD, EUR, GBP, JPY) para Real usando a cotação oficial PTAX do Banco Central.",
  keywords: ["conversor de moedas", "dolar ptax", "euro ptax", "cotação oficial banco central", "conversor euro real"]
};

export default function CurrencyPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Conversor de Moedas PTAX
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Ferramenta gratuita para converter valores utilizando a taxa de câmbio oficial (PTAX) divulgada pelo Banco Central do Brasil. Ideal para contabilidade e contratos.
        </p>
      </header>

      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <section id="calculadora">
        <CurrencyConverter />
      </section>

      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quais moedas posso converter?</h2>
        <p>
          Nossa ferramenta conecta diretamente com o Banco Central para obter as taxas de fechamento (PTAX Venda) das moedas mais negociadas:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 not-prose my-6">
          <div className="bg-gray-50 p-3 rounded border text-center font-bold text-gray-700">🇺🇸 Dólar (USD)</div>
          <div className="bg-gray-50 p-3 rounded border text-center font-bold text-gray-700">🇪🇺 Euro (EUR)</div>
          <div className="bg-gray-50 p-3 rounded border text-center font-bold text-gray-700">🇬🇧 Libra (GBP)</div>
          <div className="bg-gray-50 p-3 rounded border text-center font-bold text-gray-700">🇯🇵 Iene (JPY)</div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Por que usar a taxa PTAX?</h3>
        <p>
          A PTAX não é a taxa que você paga ao comprar dinheiro para viajar (Dólar Turismo). Ela é uma taxa média de referência usada para:
        </p>
        <ul className="list-disc pl-6">
          <li>Fechamento da fatura do cartão de crédito internacional.</li>
          <li>Contratos de prestação de serviço em moeda estrangeira.</li>
          <li>Cálculos judiciais e contábeis.</li>
        </ul>
        
        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <p className="mt-8 text-sm text-gray-500">
          * A cotação exibida refere-se ao último fechamento de dia útil disponível no sistema do Banco Central (Boletim de Fechamento PTAX).
        </p>
      </div>
    </main>
  );
}