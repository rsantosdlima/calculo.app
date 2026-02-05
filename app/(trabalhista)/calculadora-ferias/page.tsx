import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import VacationCalculator from "@/components/VacationCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Férias 2026 | Cálculo com 1/3 e Abono",
  description: "Simule o valor exato das suas férias. Veja a tabela de faltas, regras de fracionamento em até 3 períodos e o cálculo do abono pecuniário.",
  keywords: ["calcular férias", "tabela de faltas férias", "fracionamento de férias", "abono pecuniário", "férias clt 2026"]
};

export default function VacationPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Férias 2026
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Calcule o valor líquido das suas férias de forma rápida. Descubra quanto recebe se vender 10 dias (abono), entenda o desconto por faltas e as regras de fracionamento.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Calculadora Component */}
      <section id="calculadora">
        <VacationCalculator />
      </section>

      {/* Conteúdo Explicativo Rico - SEO */}
      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        
        {/* Seção 1: Conceitos Básicos */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Entenda seus Direitos: Períodos e Prazos</h2>
        <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 flex items-center gap-2">
              📅 Período Aquisitivo
            </h4>
            <p className="text-sm text-blue-800 mt-2">
              São os 12 meses de trabalho que você precisa completar para ganhar o direito às férias. Ex: Se foi contratado em 01/01/2024, completa o período em 31/12/2024.
            </p>
          </div>
          <div className="bg-green-50 p-5 rounded-lg border border-green-100">
            <h4 className="font-bold text-green-900 flex items-center gap-2">
              🏖️ Período Concessivo
            </h4>
            <p className="text-sm text-green-800 mt-2">
              São os 12 meses seguintes ao fim do período aquisitivo. É o prazo que a empresa tem para te deixar sair de férias. Se passar desse prazo, ela deve pagar em dobro.
            </p>
          </div>
        </div>

        {/* Seção 2: Fracionamento (Tabelinha de Pode/Não Pode) */}
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Como posso dividir (fracionar) minhas férias?</h3>
        <p>
          Desde a Reforma Trabalhista, as férias podem ser divididas em até <strong>3 períodos</strong>, desde que haja concordância entre patrão e empregado. Porém, existem duas "regras de ouro" para que a divisão seja válida:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Um dos períodos <strong>não pode ser menor que 14 dias corridos</strong>.</li>
          <li>Os demais períodos <strong>não podem ser menores que 5 dias corridos</strong>.</li>
        </ul>

        <div className="not-prose mt-6 mb-8">
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-800 font-bold uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Divisão (Exemplos)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Explicação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* Cenário 1 - Clássico */}
                <tr>
                  <td className="px-6 py-4 font-medium">30 dias diretos</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">PERMITIDO ✅</span></td>
                  <td className="px-6 py-4 text-gray-500">Formato tradicional.</td>
                </tr>
                {/* Cenário 2 - Comum */}
                <tr>
                  <td className="px-6 py-4 font-medium">15 dias + 15 dias</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">PERMITIDO ✅</span></td>
                  <td className="px-6 py-4 text-gray-500">Um período tem pelo menos 14 dias.</td>
                </tr>
                {/* Cenário 3 - Fracionado 3x */}
                <tr>
                  <td className="px-6 py-4 font-medium">14 dias + 8 dias + 8 dias</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">PERMITIDO ✅</span></td>
                  <td className="px-6 py-4 text-gray-500">Respeita o mínimo de 14 dias e nenhum menor que 5.</td>
                </tr>
                {/* Cenário 4 - Com Venda (Abono) */}
                <tr>
                  <td className="px-6 py-4 font-medium">20 dias gozo + 10 dias venda</td>
                  <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">PERMITIDO ✅</span></td>
                  <td className="px-6 py-4 text-gray-500">Você descansa 20 dias e recebe 10 em dinheiro (abono).</td>
                </tr>
                {/* Cenário 5 - Errado */}
                <tr className="bg-red-50">
                  <td className="px-6 py-4 font-medium">10 dias + 10 dias + 10 dias</td>
                  <td className="px-6 py-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">PROIBIDO ❌</span></td>
                  <td className="px-6 py-4 text-gray-500">Nenhum dos períodos atinge o mínimo de 14 dias.</td>
                </tr>
                {/* Cenário 6 - Errado */}
                <tr className="bg-red-50">
                  <td className="px-6 py-4 font-medium">14 dias + 12 dias + 4 dias</td>
                  <td className="px-6 py-4"><span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">PROIBIDO ❌</span></td>
                  <td className="px-6 py-4 text-gray-500">O último período é menor que 5 dias.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            * O início das férias não pode coincidir com sábado, domingo, feriado ou dia de compensação de repouso semanal. Devem começar pelo menos 2 dias antes de um feriado/DSR.
          </p>
        </div>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        {/* Seção 3: Tabela de Faltas */}
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Faltas injustificadas reduzem minhas férias?</h3>
        <p>
          Sim. Se você tiver mais de 5 faltas não justificadas durante o ano (período aquisitivo), a quantidade de dias de férias a que você tem direito começa a diminuir, podendo chegar a zero.
        </p>

        <div className="not-prose mt-4 mb-8">
          <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm max-w-2xl mx-auto">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-gray-800 text-white font-bold uppercase">
                <tr>
                  <th className="px-6 py-3 w-1/2">Número de Faltas Injustificadas</th>
                  <th className="px-6 py-3 w-1/2">Dias de Férias a Receber</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="px-6 py-3 text-gray-700">Até 5 faltas</td>
                  <td className="px-6 py-3 font-bold text-green-600">30 dias (Completo)</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-700">De 6 a 14 faltas</td>
                  <td className="px-6 py-3 font-bold text-blue-600">24 dias</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-700">De 15 a 23 faltas</td>
                  <td className="px-6 py-3 font-bold text-yellow-600">18 dias</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-700">De 24 a 32 faltas</td>
                  <td className="px-6 py-3 font-bold text-orange-600">12 dias</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-3 text-gray-700">Acima de 32 faltas</td>
                  <td className="px-6 py-3 font-bold text-red-600">0 dias (Perde o direito)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Dúvidas Frequentes</h3>
        
        <details className="group p-4 border border-gray-200 rounded-lg cursor-pointer mb-4">
          <summary className="font-bold text-gray-800 list-none flex justify-between items-center">
            <span>O que é o Abono Pecuniário?</span>
            <span className="text-blue-600 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600 text-sm">
            É a popular "venda de férias". O trabalhador pode vender até 1/3 dos dias a que tem direito (no máximo 10 dias). A vantagem é que o valor recebido pelo abono <strong>não sofre desconto de Imposto de Renda e INSS</strong>, sendo pago integralmente.
          </p>
        </details>

        <details className="group p-4 border border-gray-200 rounded-lg cursor-pointer mb-4">
          <summary className="font-bold text-gray-800 list-none flex justify-between items-center">
            <span>Quando devo receber o pagamento?</span>
            <span className="text-blue-600 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600 text-sm">
            O pagamento das férias e do terço constitucional deve ser feito até <strong>2 dias antes</strong> do início do período de descanso. Se a empresa atrasar, ela pode ser obrigada a pagar o valor em dobro.
          </p>
        </details>

        <p className="mt-12 text-sm text-gray-500 border-t pt-6">
          * Este conteúdo é informativo e baseado na CLT vigente em 2026. Acordos coletivos da sua categoria podem ter regras específicas sobre fracionamento. Consulte sempre o RH ou sindicato.
        </p>
      </div>
    </main>
  );
}
