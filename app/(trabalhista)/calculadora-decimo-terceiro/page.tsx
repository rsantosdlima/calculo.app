import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import ThirteenthCalculator from "@/components/ThirteenthCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Décimo Terceiro 2025 | 1ª e 2ª Parcela",
  description: "Calcule o valor exato do seu 13º salário. Descubra quanto cai na primeira parcela (novembro) e o valor líquido da segunda parcela (dezembro) com descontos.",
  keywords: ["calcular 13o salário", "segunda parcela décimo terceiro", "cálculo décimo terceiro proporcional", "descontos 13o salario"]
};

export default function ThirteenthPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Décimo Terceiro 2025
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Simule quanto você vai receber de Gratificação Natalina. Nossa ferramenta calcula o valor proporcional, a primeira parcela sem descontos e o líquido final com INSS e IRRF.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Calculadora */}
      <section id="calculadora">
        <ThirteenthCalculator />
      </section>

      {/* Conteúdo Explicativo */}
      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Datas de Pagamento em 2025</h2>
        
        <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-900 text-lg mb-2">1ª Parcela (Adiantamento)</h3>
            <p className="text-sm text-green-800">
              Deve ser paga entre <strong>1º de fevereiro e 30 de novembro</strong>. Corresponde a metade do salário bruto, sem nenhum desconto.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="font-bold text-blue-900 text-lg mb-2">2ª Parcela (Quitação)</h3>
            <p className="text-sm text-blue-800">
              Deve ser paga até <strong>20 de dezembro</strong>. Aqui incidem todos os impostos (INSS e IRRF) sobre o valor total, descontando o que já foi pago na primeira parcela.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Quem tem direito ao 13º proporcional?</h3>
        <p>
          Todo trabalhador com carteira assinada (CLT) tem direito a 1/12 avos do salário por mês trabalhado. 
          Para que o mês conte no cálculo, você deve ter trabalhado pelo menos <strong>15 dias</strong> naquele mês.
        </p>
        <p>
          Exemplo: Se você foi contratado em 17 de Março, o mês de Março não entra na conta (menos de 15 dias). Você receberá 9/12 avos (de Abril a Dezembro).
        </p>

        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Dúvidas Frequentes</h3>
        
        <details className="group p-4 border border-gray-200 rounded-lg cursor-pointer mb-4">
          <summary className="font-bold text-gray-800 list-none flex justify-between items-center">
            <span>O desconto do INSS é diferente no 13º?</span>
            <span className="text-blue-600 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600 text-sm">
            As alíquotas e a tabela são as mesmas do salário mensal, mas o cálculo é feito em separado. Ou seja, o valor do seu 13º não se soma ao salário de dezembro para calcular a faixa de imposto. Ele tem tributação exclusiva.
          </p>
        </details>

        <details className="group p-4 border border-gray-200 rounded-lg cursor-pointer mb-4">
          <summary className="font-bold text-gray-800 list-none flex justify-between items-center">
            <span>Recebo 13º se for demitido?</span>
            <span className="text-blue-600 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <p className="mt-3 text-gray-600 text-sm">
            Sim, na maioria dos casos (dispensa sem justa causa, pedido de demissão) você recebe o 13º proporcional aos meses trabalhados no ano na sua rescisão. A única exceção é a <strong>demissão por justa causa</strong>, que retira esse direito.
          </p>
        </details>

        <p className="mt-12 text-sm text-gray-500 border-t pt-6">
          * Este simulador utiliza as tabelas oficiais de 2025. Médias de horas extras e comissões devem ser somadas ao salário bruto para um cálculo mais preciso.
        </p>
      </div>
    </main>
  );
}