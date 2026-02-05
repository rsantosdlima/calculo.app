import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import UnemploymentCalculator from "@/components/UnemploymentCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Seguro-Desemprego 2026 | Valor e Parcelas",
  description: "Veja se você tem direito ao Seguro-Desemprego. Simule o valor e a quantidade de parcelas com base na nova tabela oficial de 2026 do Ministério do Trabalho.",
  keywords: ["calcular seguro desemprego", "tabela seguro desemprego 2026", "quantas parcelas seguro desemprego", "valor seguro desemprego", "teto seguro desemprego 2026"]
};

export default function UnemploymentPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Seguro-Desemprego
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Acabou de ser demitido? Descubra quantas parcelas do benefício você pode receber e qual será o valor exato, atualizado com a tabela oficial do MTE vigente a partir de 11 de janeiro de 2026.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Calculadora */}
      <section id="calculadora">
        <UnemploymentCalculator />
      </section>

      {/* Conteúdo Explicativo SEO */}
      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quem tem direito ao benefício?</h2>
        <p>
          O Seguro-Desemprego é um direito do trabalhador com carteira assinada (CLT) que foi demitido <strong>sem justa causa</strong>. Para receber, é necessário cumprir requisitos de tempo de trabalho (carência):
        </p>
        <ul className="list-disc pl-6 text-gray-800 space-y-2">
          <li><strong>1ª Solicitação:</strong> Ter trabalhado pelo menos 12 meses nos últimos 18 meses anteriores à demissão.</li>
          <li><strong>2ª Solicitação:</strong> Ter trabalhado pelo menos 9 meses nos últimos 12 meses.</li>
          <li><strong>3ª Solicitação em diante:</strong> Ter trabalhado os 6 meses anteriores à demissão.</li>
        </ul>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Como é calculado o valor em 2026?</h3>
        <p>
          O valor da parcela é baseado na <strong>média dos seus 3 últimos salários</strong> anteriores à demissão. Sobre essa média, aplica-se a tabela oficial de 2026:
        </p>
        <ul className="list-disc pl-6 text-gray-800 space-y-1 text-sm">
          <li>Média até <strong>R$ 2.138,76</strong>: Recebe 80% do salário médio.</li>
          <li>Média entre <strong>R$ 2.138,77 e R$ 3.564,96</strong>: Recebe R$ 1.711,01 + 50% do que exceder R$ 2.138,76.</li>
          <li>Média acima de <strong>R$ 3.564,96</strong>: Recebe o teto fixo de <strong>R$ 2.424,11</strong>.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-2">* O valor do benefício não pode ser inferior ao Salário Mínimo vigente de R$ 1.518,00.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Quantas parcelas vou receber?</h3>
        <p>
          Varia de 3 a 5 parcelas, dependendo de quantas vezes você já pediu o seguro e de quanto tempo trabalhou antes da demissão. Nossa calculadora faz essa verificação automaticamente para você.
        </p>

        <p className="mt-8 text-sm text-gray-500">
          Ainda não calculou sua rescisão? Veja nossa <Link href="/calculadora-rescisao" className="text-blue-600 hover:underline">Calculadora de Rescisão CLT</Link>.
        </p>
      </div>
    </main>
  );
}
