import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import AgeCalculator from "@/components/AgeCalculator";

export const metadata: Metadata = {
  title: "Calculadora de Idade Completa | Anos, Meses e Dias",
  description: "Descubra sua idade exata em anos, meses e dias. Veja quantos dias você já viveu e quanto tempo falta para o seu próximo aniversário.",
  keywords: ["calculadora de idade", "quantos anos tenho", "dias vividos", "calcular idade exata", "contador de idade"]
};

export default function AgePage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Calculadora de Idade
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Mais do que saber quantos anos você tem. Descubra sua idade cronológica precisa em anos, meses e dias, além de curiosidades sobre sua jornada.
        </p>
      </header>

      <div className="w-full flex justify-center bg-gray-50 rounded-lg overflow-hidden my-6">
        <AdSense slot="2405902567" format="auto" />
      </div>

      <section id="calculadora">
        <AgeCalculator />
      </section>

      <div className="prose lg:prose-lg text-gray-700 mt-16 max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como calculamos a idade?</h2>
        <p>
          O cálculo parece simples, mas envolve o calendário gregoriano, anos bissextos e a quantidade variável de dias em cada mês.
        </p>
        <p>
          Nossa ferramenta considera a data de hoje e subtrai sua data de nascimento, ajustando mês a mês para entregar a precisão exata que você não consegue fazendo a conta "de cabeça".
        </p>
      </div>
    </main>
  );
}