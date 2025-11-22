// CAMINHO: app/(trabalhista)/tabelas-inss-irpf/page.tsx

import type { Metadata } from 'next';
// Importamos os dados centralizados com os nomes da sua estrutura atual
import { INSS_TABLE, IRRF_TABLE, INSS_CEILING, IRRF_SIMPLIFIED_DISCOUNT } from '@/lib/tax-tables';

// Função auxiliar para formatar dinheiro (R$)
const formatCurrency = (value: number | null) => {
  if (value === null) return '...'; // Representação visual para infinito
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Função auxiliar para formatar porcentagem (%)
const formatPercent = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 2 }).format(value);
};

export const metadata: Metadata = {
  title: 'Tabelas INSS e IRPF 2025 atualizadas | Alíquotas e deduções oficiais',
  description: 'Consulte as tabelas oficiais de contribuição mensal do INSS e do Imposto de Renda (IRPF) vigentes em 2025. Veja as faixas salariais, alíquotas progressivas e parcelas a deduzir.',
}

export default function TaxTablesPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Tabelas de contribuição mensal: INSS e IRPF (Vigência 2025)
      </h1>

      <div className="prose lg:prose-lg text-gray-700 mb-12">
        <p>
          Para realizar o cálculo correto do salário líquido e de outros direitos trabalhistas, é fundamental utilizar as tabelas oficiais atualizadas.
        </p>
        <p>
          Abaixo, disponibilizamos as tabelas vigentes para o ano de **2025** utilizadas nos cálculos do nosso site. Os dados são centralizados e atualizados conforme a legislação.
        </p>
      </div>

      {/* --- SEÇÃO DA TABELA DO INSS --- */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-blue-600 w-2 h-8 mr-3 rounded-sm"></span>
            Tabela INSS 2025 (Contribuição Previdenciária)
        </h2>
        <p className="text-gray-700 mb-6">
           A contribuição para o INSS é progressiva. A alíquota incide apenas sobre a parcela do salário que se enquadra em cada faixa. O teto máximo de contribuição em 2025 é sobre o salário de <strong>{formatCurrency(INSS_CEILING)}</strong>.
        </p>

        <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 font-sans">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Faixa Salarial (Salário de Contribuição)</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Alíquota Progressiva</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Parcela a Deduzir</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {INSS_TABLE.map((faixa, index) => {
                // Calcula o início da faixa baseado no limite da faixa anterior
                const previousLimit = index === 0 ? 0 : INSS_TABLE[index - 1].limit;
                const minValue = previousLimit + 0.01;
                
                return (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    De {formatCurrency(minValue)} até {formatCurrency(faixa.limit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                    {formatPercent(faixa.rate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {/* Exibe a dedução que adicionamos ao arquivo */}
                    {formatCurrency(faixa.deduction)}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </section>


      {/* --- SEÇÃO DA TABELA DO IRPF --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="bg-green-600 w-2 h-8 mr-3 rounded-sm"></span>
            Tabela IRPF 2025 (Imposto de Renda na Fonte)
        </h2>
        <p className="text-gray-700 mb-6">
           Tabela vigente para 2025. O cálculo do IR permite um desconto simplificado mensal de <strong>{formatCurrency(IRRF_SIMPLIFIED_DISCOUNT)}</strong> caso seja mais vantajoso que as deduções legais (dependentes, etc.).
        </p>

        <div className="overflow-x-auto shadow-sm border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 font-sans">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Base de Cálculo (Após deduções)</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Alíquota</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Parcela a Deduzir do IR</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {IRRF_TABLE.map((faixa, index) => {
                 // Lógica para exibir "Até X", "De X até Y" ou "Acima de X" baseado no null
                 const previousLimit = index === 0 ? 0 : IRRF_TABLE[index - 1].limit || 0;
                 let rangeText = "";
                 if (index === 0) {
                     rangeText = `Até ${formatCurrency(faixa.limit)}`;
                 } else if (faixa.limit === null) {
                     rangeText = `Acima de ${formatCurrency(previousLimit)}`;
                 } else {
                     rangeText = `De ${formatCurrency(previousLimit + 0.01)} até ${formatCurrency(faixa.limit)}`;
                 }

                return (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {rangeText}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">
                    {faixa.rate === 0 ? 'Isento' : formatPercent(faixa.rate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {faixa.deduction === 0 ? '-' : formatCurrency(faixa.deduction)}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </section>

      <div className="prose lg:prose-lg text-gray-700 mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Atualização dos dados</h3>
        <p>
            As tabelas são atualizadas conforme a legislação vigente. A tabela do INSS acompanha o salário mínimo de 2025 (R$ 1.518,00), e a tabela do IRPF reflete as faixas atuais para o ano-calendário.
        </p>
      </div>

    </main>
  );
}