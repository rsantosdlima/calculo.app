import Link from "next/link";

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

      {/* Ad Placeholder (Top) */}
      <div className="w-full h-24 bg-gray-200 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500">
        Espaço para Publicidade (Banner Horizontal)
      </div>

      {/* Categories Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculadoras Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <Link href="/calculadora-salario-liquido" className="block group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                $
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Salário Líquido</h3>
              <p className="text-gray-600 text-sm">
                Calcule os descontos de INSS e IRRF e descubra quanto sobra no final do mês.
              </p>
            </div>
          </Link>

          {/* Card 2 - Placeholder */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100 opacity-60">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              %
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Correção Monetária</h3>
            <p className="text-gray-600 text-sm">
              Em breve: Atualize valores pela inflação (IPCA, IGP-M).
            </p>
          </div>

          {/* Card 3 - Placeholder */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100 opacity-60">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
              📅
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Dias entre Datas</h3>
            <p className="text-gray-600 text-sm">
               Em breve: Calcule a quantidade exata de dias, meses e anos.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
