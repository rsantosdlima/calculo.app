import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import CltPjComparison from "@/components/CltPjComparison";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora CLT x PJ 2025 | Comparativo Salário Líquido",
  description: "Compare salários CLT vs PJ. Descubra qual vale mais a pena considerando impostos do Simples Nacional, FGTS, 13º salário, férias e benefícios.",
  keywords: ["clt ou pj", "calculadora clt pj", "simulador pj x clt", "salário pj equivalente", "impostos pj simples nacional"]
};

export default function CltPjPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Comparativo CLT x PJ
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Recebeu uma proposta para virar PJ? Use nosso simulador para comparar o ganho líquido real anual, considerando todos os benefícios da CLT (FGTS, Férias, 13º) contra os impostos do PJ.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <section id="calculadora">
        <CltPjComparison />
      </section>

      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como comparar corretamente?</h2>
        <p>
          O erro mais comum é comparar apenas o salário mensal. Um salário de R$ 5.000,00 CLT custa muito mais para a empresa e entrega muito mais benefícios ao trabalhador do que uma nota fiscal de R$ 5.000,00 PJ.
        </p>
        <p>
          Para uma comparação justa, nossa calculadora considera o <strong>Pacote Anual</strong>:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-blue-800 text-lg mb-3">Vantagens CLT (Invisíveis)</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
              <li><strong>FGTS:</strong> 8% do salário depositado todo mês (dinheiro seu).</li>
              <li><strong>13º Salário:</strong> Um salário extra no fim do ano.</li>
              <li><strong>Férias Remuneradas:</strong> Recebe para descansar + 1/3 de bônus.</li>
              <li><strong>Segurança:</strong> Seguro-Desemprego e Multa de 40% em demissões.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-orange-800 text-lg mb-3">Custos PJ (Ocultos)</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
              <li><strong>Impostos:</strong> Você paga sua própria guia (DAS), começando em 6%.</li>
              <li><strong>Contador:</strong> Custo mensal obrigatório para manter o CNPJ.</li>
              <li><strong>Sem Benefícios:</strong> Geralmente não há VR, VT ou plano de saúde pago.</li>
              <li><strong>Férias não pagas:</strong> Se não trabalhar, não fatura (salvo negociação).</li>
            </ul>
          </div>
        </div>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Regra de Ouro: O Fator 1.5x</h3>
        <p>
          Especialistas de mercado costumam dizer que, para valer a pena trocar CLT por PJ, o valor da nota fiscal deve ser, no mínimo, <strong>40% a 50% maior</strong> que o salário bruto CLT.
        </p>
        <p>
          Exemplo: Se você ganha R$ 5.000 CLT, a proposta PJ deveria ser em torno de R$ 7.500 a R$ 8.000 para manter o mesmo poder de compra e capacidade de poupança.
        </p>

      </div>
    </main>
  );
}