import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import MultipleBondsCalculator from "@/components/MultipleBondsCalculator";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Calculadora de Salário Líquido com Múltiplos Vínculos 2025",
    description:
        "Calcule o salário líquido somando múltiplos vínculos empregatícios. Verifique se o recolhimento do INSS está correto e simule o IRRF consolidado.",
};

export default function MultipleBondsPage() {
    return (
        <main className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Calculadora de Múltiplos Vínculos
            </h1>

            {/* Top Ad */}
            <AdSense slot="2405902567" className="my-8" format="auto" />

            <div className="prose lg:prose-lg text-gray-700 mb-8">
                <p>
                    Simule o impacto de ter mais de um emprego no seu salário líquido e
                    verifique se o <strong>INSS</strong> está sendo recolhido corretamente.
                    Muitas vezes, quem possui múltiplos vínculos acaba pagando mais INSS do
                    que o teto permitido, ou menos do que o devido na soma das rendas.
                </p>
            </div>

            <MultipleBondsCalculator />

            <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Como funciona o cálculo com múltiplos vínculos?
                    </h2>
                    <p>
                        Quando um trabalhador possui mais de um vínculo empregatício (dois ou
                        mais empregos CLT), a tributação acontece de forma um pouco diferente:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>INSS:</strong> As remunerações são somadas para determinar
                            a alíquota, porém, existe um teto máximo de contribuição. Se a soma
                            dos salários ultrapassar esse teto, o trabalhador não deve
                            contribuir sobre o excedente. É comum que, sem comunicar as
                            empresas, o desconto seja feito em duplicidade ou a maior.
                        </li>
                        <li>
                            <strong>IRRF:</strong> O Imposto de Renda é calculado sobre a soma
                            de todos os rendimentos tributáveis. Muitas vezes, o desconto feito
                            individualmente em cada empresa é menor do que o devido quando se
                            soma tudo, o que pode gerar imposto a pagar na Declaração de Ajuste
                            Anual.
                        </li>
                    </ul>
                </section>

                {/* Middle Ad */}
                <AdSense slot="2405902567" className="my-8" format="auto" />

                <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 not-prose shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                        O que fazer se o INSS foi descontado a maior?
                    </h3>
                    <p className="text-gray-800">
                        Se você verificar que a soma dos descontos de INSS ultrapassou o
                        teto, você deve comunicar o RH de uma das empresas (geralmente a mais
                        recente ou a que paga menos) apresentando o comprovante de
                        rendimentos da outra. Assim, eles ajustarão o desconto para que você
                        não pague indevidamente.
                    </p>
                </section>

                <section className="bg-blue-50 p-6 rounded-lg border border-blue-200 not-prose shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                        O que fazer se o INSS foi descontado a menor?
                    </h3>
                    <p className="text-gray-800">
                        Se a soma dos seus salários muda sua faixa de contribuição e o total
                        descontado foi menor do que o devido sobre a soma, você é responsável
                        por recolher a diferença. Isso é feito através de uma guia avulsa
                        (DARF/GPS) que pode ser emitida no site da Receita Federal.
                    </p>
                </section>

                <section>
                    <p>
                        Quer conferir as alíquotas oficiais? Veja nossa página de{" "}
                        <Link
                            href="/tabelas-inss-irpf"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Tabelas INSS e IRPF
                        </Link>
                        .
                    </p>
                </section>
            </div>
        </main>
    );
}
