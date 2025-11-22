import Link from "next/link";
import AdSense from "@/components/AdSense";

export default function Home() {
  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <section className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          Simulações e Cálculos Online
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ferramentas precisas para facilitar suas contas do dia a dia.
          Trabalhista, Financeiro, Datas e muito mais.
        </p>
      </section>

      {/* Ad Banner (Top) */}
      <div className="w-full">
        <AdSense
           slot="0987654321"
           style={{ minHeight: '100px' }}
        />
      </div>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadoras Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 - IRRF 2026 */}
          <Link href="/calculadora-irrf-2026" className="block group">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border border-gray-100 border-l-4 border-l-red-500">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
              📅
            </div>
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Simulador IRRF 2026 - Projeto de Lei (PL) nº 1087/2025</h3>
            <p className="text-gray-400 text-sm">
               Entenda como a proposta do Governo Federal altera o cálculo do IRRF, 
               garantindo isenção efetiva para quem ganha até R$ 5.000 e reduzindo o imposto da classe média.
            </p>
          </div>
          </Link>
          
          {/* Card 2 - Salary */}
          <Link href="/calculadora-salario-liquido" className="block group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border border-gray-100 border-l-4 border-l-blue-500">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                $
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Salário Líquido</h3>
              <p className="text-gray-600 text-sm">
                Calcule os descontos de INSS e IRRF e descubra quanto sobra no final do mês.
              </p>
            </div>
          </Link>

          {/* Card 3 - Simple Interest */}
          <Link href="/calculadora-juros-simples" className="block group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border border-gray-100 border-l-4 border-l-green-500">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                %
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Juros Simples</h3>
                <p className="text-gray-600 text-sm">
                Calcule o rendimento de um valor aplicado com taxa e prazo personalizados.
                </p>
            </div>
          </Link>
          </div>
        </section>
    </div>
  );
}
