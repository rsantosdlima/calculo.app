import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import TimeCalculator from "@/components/TimeCalculator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calculadora de Horas e Minutos | Somar e Subtrair Tempo",
  description: "Some horas e minutos facilmente. Ferramenta ideal para calcular banco de horas, folha de ponto e converter horas relógio em horas decimais.",
  keywords: ["calculadora de horas", "somar horas", "calcular banco de horas", "horas trabalhadas", "converter hora em decimal"]
};

export default function TimeCalculatorPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Horas
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Some e subtraia horas e minutos de forma simples. Ideal para fechar sua folha de ponto, conferir o banco de horas ou planejar escalas de trabalho.
        </p>
      </header>

      {/* Top Ad */}
      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* Calculadora */}
      <section id="calculadora">
        <TimeCalculator />
      </section>

      {/* Conteúdo Explicativo */}
      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como funciona o Banco de Horas?</h2>
        <p>
          O banco de horas é um sistema de compensação onde as horas trabalhadas a mais em um dia (crédito) podem ser folgadas em outro dia (débito). Para controlar o saldo, você precisa somar todas as entradas e saídas.
        </p>
        
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 my-8 not-prose">
          <h3 className="font-bold text-blue-900 text-lg mb-2">Exemplo Prático</h3>
          <p className="text-sm text-blue-800">
            Se você trabalhou 09:30 na segunda-feira (jornada normal de 08:00), você tem um <strong>crédito de +01:30</strong>.<br/>
            Se na terça você trabalhou apenas 07:00, você tem um <strong>débito de -01:00</strong>.<br/>
            Saldo final: <strong>+00:30</strong> minutos positivos.
          </p>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Hora Relógio vs Hora Decimal</h3>
        <p>
          Um erro muito comum é usar a calculadora comum para somar horas. Se você digitar <code>8,30 + 1,30</code> na calculadora, o resultado será <code>9,60</code>, o que está errado (o correto seria 10 horas).
        </p>
        <p>
          Nossa ferramenta faz a conversão correta da base 60 (minutos) para que você não erre a conta. Além disso, fornecemos o <strong>fator decimal</strong> no final, que é essencial para multiplicar pelo valor da sua hora e saber quanto receberá em dinheiro.
        </p>

        {/* Middle Ad */}
        <div className="w-full flex justify-center my-8">
          <AdSense slot="2405902567" format="auto" />
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Precisa calcular o valor das suas horas extras? Use nossa <Link href="/calculadora-horas-extras" className="text-blue-600 hover:underline">Calculadora de Horas Extras</Link> que já faz o cálculo financeiro completo.
        </p>
      </div>
    </main>
  );
}