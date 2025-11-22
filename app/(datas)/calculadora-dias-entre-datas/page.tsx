import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
// Importa o novo componente correto
import DateDiffCalculator from "@/components/DateDiffCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Dias entre Datas | Dias Corridos",
  description:
    "Calcule facilmente a quantidade exata de dias corridos entre duas datas, incluindo o dia inicial e final.",
};

export default function DateDiffPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
        Calculadora de Dias entre Datas (Corridos)
      </h1>

      {/* Top Ad */}
      <AdSense slot="2405902567" className="my-8" format="auto" />

      <div className="prose lg:prose-lg text-gray-700 mb-8">
        <p>
          Use esta ferramenta para saber exatamente quantos dias existem entre
          uma data inicial e uma data final. O cálculo considera{" "}
          <strong>dias corridos</strong>, ou seja, inclui sábados, domingos e
          feriados no resultado.
        </p>
        <p>
          É ideal para calcular prazos contratuais, tempo de serviço, idade em
          dias ou a duração total de um período.
        </p>
      </div>

      {/* Insere o componente da calculadora */}
      <DateDiffCalculator />

      <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Como o cálculo é feito?
          </h2>
          <p>
            A calculadora considera o intervalo <strong>inclusive</strong>. Isso
            significa que tanto a data de início quanto a data de término são
            contadas no total de dias.
          </p>
          <p>
            Por exemplo, se você selecionar de 01/01 a 02/01, o resultado será 2
            dias (o dia 1 e o dia 2).
          </p>
        </section>

        {/* Middle Ad */}
        <AdSense slot="2405902567" className="my-8" format="auto" />

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Diferença entre Dias Corridos e Dias Úteis
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Dias Corridos (esta calculadora):</strong> Conta todos os
              dias do calendário, sem exceção.
            </li>
            <li>
              <strong>Dias Úteis:</strong> Conta apenas de segunda a sexta-feira,
              excluindo feriados nacionais. Se você precisa desse cálculo, use
              nossa{" "}
              <a href="/calculadora-dias-uteis" className="text-blue-600 hover:underline">
                Calculadora de Dias Úteis
              </a>
              .
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}