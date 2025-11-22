import IRRF2026Calculator from "@/components/IRRF2026Calculator";
import AdSense from "@/components/AdSense";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Simulação de IRRF 2026 | Nova tabela (PL 1087/2025)",
  description:
    "Simule seu Imposto de Renda em 2026 com base no Projeto de Lei 1087/2025. Veja a proposta de isenção para quem ganha até R$ 3.600 e a nova dedução simplificada.",
};

export default function IRRF2026Page() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Simulação IRRF 2026: Isenção até R$ 3.600 (Projeto de Lei)
      </h1>

      {/* Top Ad */}
      <AdSense slot="2405902567" className="my-8" format="auto" />

      <div className="prose lg:prose-lg text-gray-700 mb-8">
        <p>
          O Governo Federal enviou ao Congresso o <strong>Projeto de Lei (PL) nº 1087/2025</strong>, que propõe mudanças significativas no Imposto de Renda da Pessoa Física (IRPF) a partir de 2026. O objetivo principal é ampliar a faixa de isenção, beneficiando trabalhadores com renda de até dois salários mínimos e meio.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 not-prose rounded-r-lg shadow-sm">
          <h3 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Atenção: Proposta em Tramitação
          </h3>
          <p className="text-gray-800 text-sm">
            Os cálculos abaixo são uma <strong>simulação</strong> baseada no texto original do PL 1087/2025. As regras ainda <strong>não estão em vigor</strong> e podem ser alteradas ou rejeitadas pelo Congresso Nacional antes de se tornarem lei para 2026.
          </p>
        </div>
        <p>
          Utilize a calculadora abaixo para comparar como seria o seu desconto de IR hoje (regra 2025) e como ficaria se a nova proposta fosse aprovada.
        </p>
      </div>

      <IRRF2026Calculator />

      <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">O que muda com a proposta (PL 1087/2025)?</h2>
          <p>A principal mudança é a introdução de uma <strong>nova dedução simplificada mensal</strong>, focada em isentar quem ganha menos. Os pontos-chave são:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Isenção na Prática até ~R$ 3.600:</strong> Quem ganha até R$ 3.600,00 por mês (considerando o salário mínimo projetado de R$ 1.518 para 2025) ficaria isento de IRRF devido à combinação da faixa de isenção atual com o novo desconto simplificado.
            </li>
            <li>
              <strong>Novo Desconto Simplificado:</strong> A proposta cria um desconto fixo mensal de <strong>R$ 600,00</strong> da base de cálculo do imposto.
            </li>
            <li>
              <strong>Limite do Benefício:</strong> Esse novo desconto de R$ 600,00 seria aplicado apenas para rendimentos tributáveis mensais de até <strong>R$ 7.350,00</strong> (valor equivalente a 5 salários mínimos projetados). Quem ganha acima disso continuaria sujeito às regras normais de deduções legais.
            </li>
          </ul>
        </section>

        {/* Middle Ad */}
        <AdSense slot="2405902567" className="my-8" format="auto" />

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200 not-prose shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Exemplo Prático: Salário de R$ 3.500,00</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white p-4 rounded border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2">Regra Atual (2025)</h4>
              <p className="text-gray-600 text-sm mb-2">Aplica-se o desconto simplificado atual (R$ 564,80) ou deduções legais.</p>
              <p className="text-lg font-semibold text-red-600">IRRF Devido: ~R$ 55,00</p>
            </div>
            <div className="bg-white p-4 rounded border border-blue-200 ring-2 ring-blue-100">
              <h4 className="font-bold text-blue-700 mb-2">Nova Proposta (2026)</h4>
              <p className="text-gray-600 text-sm mb-2">Aplica-se o novo desconto simplificado de R$ 600,00 sobre a base.</p>
              <p className="text-lg font-extrabold text-green-600">IRRF Devido: R$ 0,00 (Isento)</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">*Valores aproximados para fins ilustrativos, considerando apenas o desconto simplificado.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Como a calculadora funciona?</h2>
          <p>Nossa ferramenta realiza dois cálculos simultâneos:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Cenário Atual (2025):</strong> Calcula o IRRF com base nas tabelas e regras vigentes hoje, escolhendo automaticamente entre as deduções legais (INSS, dependentes, pensão) ou o desconto simplificado atual (R$ 564,80), o que for mais vantajoso.</li>
            <li><strong>Cenário Proposto (2026):</strong> Aplica a regra do PL 1087/2025. Se o salário for até R$ 7.350, aplica o desconto de R$ 600,00 da base e calcula o imposto. Se for maior, aplica a regra atual como comparação.</li>
          </ol>
          <p className="mt-4">
            Para entender as regras atuais a fundo, consulte nossa página de <Link href="/tabelas-inss-irpf" className="text-blue-600 hover:underline font-medium">Tabelas INSS e IRPF</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}