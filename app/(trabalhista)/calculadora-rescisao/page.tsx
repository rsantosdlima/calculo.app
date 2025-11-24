import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import TerminationCalculator from "@/components/TerminationCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Rescisão de Contrato 2025 | Acerto Trabalhista",
  description: "Simule sua rescisão CLT com precisão. Cálculo para demissão sem justa causa, pedido de demissão, término de contrato e acordo comum.",
  keywords: ["calcular rescisão", "acerto trabalhista", "pedido de demissão", "aviso prévio", "multa fgts"]
};

export default function TerminationPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Rescisão de Contrato
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Simule os valores do seu acerto trabalhista considerando as regras atualizadas da CLT para 2025.
        </p>
      </header>

      {/* DISCLAIMER IMPORTANTE */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-amber-800">Atenção: Este cálculo é uma simulação</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>
                O resultado apresentado serve apenas como base. Podem existir <strong>outros proventos</strong> (horas extras, médias de comissões, adicionais noturno/insalubridade) ou <strong>descontos</strong> (vale transporte, vale refeição, plano de saúde, adiantamentos) que não são contemplados nesta calculadora simples.
              </p>
              <p className="mt-1">
                Para um acerto oficial, consulte o RH da sua empresa ou um contador.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <section id="calculadora">
        <TerminationCalculator />
      </section>

      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Guia Completo dos Tipos de Rescisão</h2>
        
        <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Dispensa sem Justa Causa</h3>
            <p className="text-sm text-gray-600 mb-3">A empresa encerra o contrato. O trabalhador tem o maior pacote de direitos.</p>
            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
              <li>Aviso Prévio (Trabalhado ou Indenizado)</li>
              <li>Multa de 40% do FGTS + Saque</li>
              <li>Seguro-Desemprego (se elegível)</li>
              <li>Todas as verbas proporcionais</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Pedido de Demissão</h3>
            <p className="text-sm text-gray-600 mb-3">Você decide sair. Abre mão de alguns direitos em troca da liberdade.</p>
            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
              <li>Sem multa de 40% e sem saque do FGTS</li>
              <li>Sem Seguro-Desemprego</li>
              <li>Recebe saldo e proporcionais</li>
              <li>Pode ter desconto do aviso se não cumprir</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Acordo Comum (Reforma)</h3>
            <p className="text-sm text-gray-600 mb-3">Decisão conjunta. Um meio-termo criado pela Reforma Trabalhista.</p>
            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
              <li>Aviso prévio indenizado pela metade (50%)</li>
              <li>Multa de 20% do FGTS</li>
              <li>Saque de 80% do FGTS</li>
              <li>Sem Seguro-Desemprego</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Término de Contrato</h3>
            <p className="text-sm text-gray-600 mb-3">Fim do contrato de experiência ou prazo determinado.</p>
            <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
              <li>Sem aviso prévio (data já era conhecida)</li>
              <li>Sem multa de 40% do FGTS</li>
              <li>Saca o FGTS depositado</li>
              <li>Recebe proporcionais normalmente</li>
            </ul>
          </div>
        </div>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">O Aviso Prévio na Prática</h3>
        <p>
          O aviso prévio comunica o fim do contrato. No <strong>Pedido de Demissão</strong>, se você não cumprir os 30 dias trabalhando, a empresa tem o direito legal de descontar esse valor da sua rescisão.
        </p>
        <p>
          Na <strong>Dispensa</strong>, a empresa pode exigir que você trabalhe (com redução de jornada) ou pode te indenizar (pagar sem você trabalhar). Além disso, existe o <strong>Aviso Prévio Proporcional</strong>: a cada ano trabalhado, a empresa deve pagar 3 dias a mais de indenização (limitado a 90 dias no total).
        </p>
      </div>
    </main>
  );
}