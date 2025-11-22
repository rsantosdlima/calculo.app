import SalaryCalculator from "@/components/SalaryCalculator";
import AdSense from "@/components/AdSense";
import type { Metadata } from 'next'
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Calculadora de salário líquido 2025 online | Descontos de INSS e IRRF',
  description: 'Calcule o valor exato do seu salário líquido em 2025. Simule os descontos oficiais de INSS e Imposto de Renda (IRRF) e descubra quanto sobra no seu bolso.',
}

export default function SalaryPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Calculadora de salário líquido 2025 online</h1>
      
      {/* Top Ad */}
      <AdSense slot="2405902567" className="my-8" format="auto" />

      <div className="prose lg:prose-lg text-gray-700 mb-8">
        <p>Saber quanto você realmente vai receber no final do mês é essencial para o seu planejamento financeiro. O salário bruto registrado na carteira de trabalho sofre descontos obrigatórios por lei antes de chegar à sua conta bancária.</p>
        <p>Nossa calculadora online realiza a simulação completa e atualizada para 2025, considerando as novas tabelas progressivas do INSS e do Imposto de Renda (IRRF), além de deduções por dependentes.</p>
      </div>
        
      <SalaryCalculator />

      <div className="prose lg:prose-lg text-gray-700 mt-12 space-y-8">
        <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como o cálculo é feito?</h2>
            <p>O cálculo do salário líquido segue uma ordem específica de descontos:</p>
            <ol>
                <li><strong>1º INSS (Previdência):</strong> Calculado sobre o salário bruto usando a <Link href="/tabelas-inss-irpf" className="text-blue-600 hover:underline">tabela progressiva do INSS 2025</Link>. O valor é descontado para sua aposentadoria e benefícios sociais.</li>
                <li><strong>2º Base do IRRF:</strong> Do salário bruto, subtrai-se o valor do INSS calculado e o valor total de dedução por dependentes (se houver). O resultado é a base para o cálculo do Imposto de Renda.</li>
                <li><strong>3º IRRF (Imposto de Renda):</strong> Aplica-se a alíquota da <Link href="/tabelas-inss-irpf" className="text-blue-600 hover:underline">tabela do IRRF 2025</Link> sobre a base de cálculo e subtrai-se a parcela a deduzir correspondente à faixa.</li>
            </ol>
            <p>O <strong>Salário Líquido</strong> é o resultado do Salário Bruto menos o INSS e menos o IRRF.</p>
        </section>

        {/* Middle Ad - Corrigido (fora do parágrafo) */}
        <AdSense slot="2405902567" className="my-8" format="auto" />

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200 not-prose">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Desconto Simplificado do IRRF</h3>
          <p className="text-gray-800">
            A legislação atual permite que o contribuinte opte por um desconto simplificado mensal (R$ 564,80 em 2024, valor pode ser atualizado para 2025) em substituição às deduções legais (como previdência e dependentes), caso seja mais vantajoso. Nossa calculadora verifica automaticamente qual cenário resulta em menor imposto para você.
          </p>
        </section>

        <section>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">Outros Descontos</h2>
           <p>Além do INSS e IRRF, que são obrigatórios, seu salário pode sofrer outros descontos opcionais ou contratuais, como:</p>
           <ul>
               <li>Vale-transporte (até 6% do salário básico).</li>
               <li>Vale-refeição ou alimentação (parte do custo).</li>
               <li>Planos de saúde e odontológico.</li>
               <li>Contribuição sindical (se autorizada).</li>
               <li>Empréstimos consignados.</li>
           </ul>
           <p>Nossa ferramenta foca nos descontos tributários principais (INSS e IR) para te dar uma base sólida do valor líquido.</p>
        </section>
      </div>
    </main>
  );
}