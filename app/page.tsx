import Link from "next/link";
import AdSense from "@/components/AdSense";

// Componente auxiliar para Cards de Ferramenta
function ToolCard({ href, title, description, icon, colorClass, badge }: { href: string, title: string, description: string, icon: string, colorClass: string, badge?: string }) {
  return (
    <Link href={href} className="block group h-full">
      <div className={`bg-white rounded-xl shadow-sm p-6 h-full border border-gray-100 transition-all duration-200 hover:shadow-md hover:-translate-y-1 border-l-4 ${colorClass} relative overflow-hidden`}>
        {badge && (
          <span className="absolute top-0 right-0 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wide">
            {badge}
          </span>
        )}
        <div className="flex items-center mb-3">
          <span className="text-3xl mr-3">{icon}</span>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="space-y-16 pb-12">

      {/* 1. Hero Section */}
      <section className="text-center space-y-6 py-8 md:py-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Cálculos Trabalhistas e <br className="hidden md:block" />
          Financeiros <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Descomplicados</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Ferramentas precisas e atualizadas para RH, contadores e trabalhadores.
          Simule rescisões, férias e salários com as regras de <strong>2026</strong>.
        </p>
      </section>

      {/* 2. Destaque "Hype": IRRF 2026 - ATUALIZADO PARA LEI SANCIONADA */}
      <section className="max-w-4xl mx-auto">
        <Link href="/calculadora-irrf-2026" className="block group">
          <div className="bg-gradient-to-r from-indigo-900 to-blue-800 rounded-2xl p-1 p-[2px] shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.01]">
            <div className="bg-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Background Decorativo */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl group-hover:bg-blue-200 transition-all"></div>

              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="text-center md:text-left mb-6 md:mb-0">
                  <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-bold tracking-wide uppercase mb-3">
                    Lei 15.270 Publicada
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Simulador IRRF 2026 (Lei Aprovada)
                  </h2>
                  <p className="text-gray-600 max-w-lg">
                    A lei que isenta quem ganha até R$ 5.000 foi sancionada! Simule agora seu salário líquido com as novas regras oficiais para 2026.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md group-hover:shadow-lg">
                    Calcular Agora &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Ad Banner (Top) */}
      <div className="w-full flex justify-center">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* 3. Ferramentas Principais (Grid) */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3 text-xl">🚀</span>
            Ferramentas Populares
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            href="/calculadora-salario-liquido"
            title="Salário Líquido 2026"
            description="Cálculo exato com as novas tabelas de INSS e IRRF vigentes."
            icon="💰"
            colorClass="border-l-green-500"
            badge="Atualizado"
          />
          <ToolCard
            href="/calculadora-rescisao"
            title="Rescisão CLT"
            description="Simule seu acerto: aviso prévio, multa FGTS, férias e 13º."
            icon="📝"
            colorClass="border-l-blue-500"
          />
          <ToolCard
            href="/calculadora-ferias"
            title="Cálculo de Férias"
            description="Planeje seu descanso com venda de abono e adiantamento."
            icon="🏖️"
            colorClass="border-l-orange-500"
          />
          <ToolCard
            href="/calculadora-decimo-terceiro"
            title="13º Salário"
            description="Veja o valor da 1ª e 2ª parcela com os descontos legais."
            icon="🎄"
            colorClass="border-l-red-500"
          />
          <ToolCard
            href="/calculadora-seguro-desemprego"
            title="Seguro-Desemprego"
            description="Consulte o valor e a quantidade de parcelas a receber."
            icon="🛡️"
            colorClass="border-l-indigo-500"
          />
          <ToolCard
            href="/comparativo-clt-pj"
            title="Comparativo CLT x PJ"
            description="Compare o ganho líquido real anual entre os regimes."
            icon="⚖️"
            colorClass="border-l-purple-500"
          />
        </div>
      </section>

      {/* 4. Seção de Credibilidade (Trust Bar) */}
      <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {/* Coluna 1 */}
          <div className="px-4 flex flex-col items-center justify-center text-center">
            <div className="text-blue-600 text-4xl mb-3 font-bold">2026</div>
            <h3 className="font-bold text-gray-900 text-lg">100% Atualizado</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Todas as ferramentas seguem a legislação trabalhista e tabelas vigentes.</p>
          </div>

          {/* Coluna 2 */}
          <div className="px-4 pt-8 md:pt-0 flex flex-col items-center justify-center text-center">
            <div className="text-green-600 text-4xl mb-3 font-bold">LGPD</div>
            <h3 className="font-bold text-gray-900 text-lg">Privacidade Total</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Seus dados não são salvos. Todo o cálculo acontece no seu navegador.</p>
          </div>

          {/* Coluna 3 */}
          <div className="px-4 pt-8 md:pt-0 flex flex-col items-center justify-center text-center">
            <div className="text-purple-600 text-4xl mb-3 font-bold">Grátis</div>
            <h3 className="font-bold text-gray-900 text-lg">Acesso Livre</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-xs">Sem cadastro, sem paywall. Ferramentas profissionais acessíveis a todos.</p>
          </div>
        </div>
      </section>

      {/* 5. Mais Ferramentas (Secundárias) */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-6 pl-2 border-l-4 border-gray-300">
          Utilidades Financeiras & Datas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/conversor-salario" className="bg-gray-50 hover:bg-white border border-gray-200 p-4 rounded-lg transition-all hover:shadow-sm flex items-center group">
            <span className="text-xl mr-3 group-hover:scale-110 transition-transform">🔄</span>
            <div>
              <h4 className="font-bold text-gray-700 text-sm">Conversor de Salário</h4>
              <p className="text-xs text-gray-500">Hora, Dia, Mês, Ano</p>
            </div>
          </Link>
          <Link href="/calculadora-horas-extras" className="bg-gray-50 hover:bg-white border border-gray-200 p-4 rounded-lg transition-all hover:shadow-sm flex items-center group">
            <span className="text-xl mr-3 group-hover:scale-110 transition-transform">⏰</span>
            <div>
              <h4 className="font-bold text-gray-700 text-sm">Horas Extras</h4>
              <p className="text-xs text-gray-500">Com DSR e adicionais</p>
            </div>
          </Link>
          <Link href="/calculadora-dias-uteis" className="bg-gray-50 hover:bg-white border border-gray-200 p-4 rounded-lg transition-all hover:shadow-sm flex items-center group">
            <span className="text-xl mr-3 group-hover:scale-110 transition-transform">📅</span>
            <div>
              <h4 className="font-bold text-gray-700 text-sm">Dias Úteis</h4>
              <p className="text-xs text-gray-500">Desconta feriados</p>
            </div>
          </Link>
          <Link href="/calculadora-juros-compostos" className="bg-gray-50 hover:bg-white border border-gray-200 p-4 rounded-lg transition-all hover:shadow-sm flex items-center group">
            <span className="text-xl mr-3 group-hover:scale-110 transition-transform">📈</span>
            <div>
              <h4 className="font-bold text-gray-700 text-sm">Juros Compostos</h4>
              <p className="text-xs text-gray-500">Simulador de investimentos</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Ad Banner (Bottom) */}
      <div className="w-full flex justify-center">
        <AdSense slot="2405902567" format="auto" />
      </div>

      {/* 6. Contexto / Quem Usa (SEO Semântico) */}
      <section className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Quem usa o Calculo.App?</h2>
          <p className="text-gray-600">Desenvolvemos nossas ferramentas pensando em diferentes necessidades do mercado de trabalho.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center justify-center md:justify-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
              Para o Trabalhador
            </h4>
            <p className="text-sm text-gray-600">
              Confira seu holerite, planeje suas férias e entenda seus direitos antes de assinar a rescisão. Informação é poder.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center justify-center md:justify-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
              Para o RH e DP
            </h4>
            <p className="text-sm text-gray-600">
              Faça pré-cálculos rápidos, valide folhas de pagamento e tire dúvidas de colaboradores com simuladores confiáveis.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center justify-center md:justify-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
              Para Contadores
            </h4>
            <p className="text-sm text-gray-600">
              Ferramentas ágeis para o dia a dia. Calcule impostos do Simples Nacional, compare regimes tributários e auxilie clientes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
