import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import DateAdderCalculator from "@/components/DateAdderCalculator";

export const metadata: Metadata = {
  title: "Somar ou Subtrair Dias de uma Data | Calculadora de Prazos",
  description: "Calcule prazos facilmente. Adicione ou subtraia dias, semanas, meses ou anos de uma data inicial. Ideal para advogados, gestantes e planejamento.",
  keywords: ["somar dias data", "calculadora de prazos", "adicionar dias data", "que dia cai", "contador de dias"]
};

export default function DateAdderPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Somar Dias à Data
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Precisa calcular um prazo de 45 dias? Ou saber que dia foi 3 semanas atrás? Use nossa calculadora para somar ou subtrair períodos de qualquer data.
        </p>
      </header>

      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <section id="calculadora">
        <DateAdderCalculator />
      </section>

      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Para que serve esta ferramenta?</h2>
        <ul className="list-disc pl-6 text-gray-800 space-y-2">
          <li><strong>Prazos Processuais:</strong> Advogados podem calcular datas finais (lembre-se de conferir feriados locais).</li>
          <li><strong>Gestação:</strong> Calcule a data provável somando 280 dias (40 semanas) à data da última menstruação.</li>
          <li><strong>Garantias e Validades:</strong> Saiba exatamente quando vence a garantia de um produto.</li>
          <li><strong>Contratos de Experiência:</strong> Calcule os 45 ou 90 dias exatos do término do contrato.</li>
        </ul>
      </div>
    </main>
  );
}