import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto print:hidden">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 xl:gap-12">
          
          {/* --- Coluna 1: Sobre Nós (Ocupa 2 colunas no mobile para destaque) --- */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              Cálculo<span className="text-blue-500">.App</span>
            </h3>
            <p className="text-sm leading-6 mb-4">
              Ferramentas de simulação e cálculo online desenvolvidas para facilitar o seu dia a dia. Trabalhista, financeiro, contagem de datas e muito mais, de forma simples e precisa.
            </p>
          </div>

          {/* --- Coluna 2: Trabalhistas --- */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Trabalhistas</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/calculadora-salario-liquido" className="text-sm hover:text-white transition-colors">
                  Salário Líquido 2025
                </Link>
              </li>
              <li>
                <Link href="/calculadora-irrf-2026" className="text-sm hover:text-white transition-colors">
                  Simulação IRRF 2026
                </Link>
              </li>
              <li>
                <Link href="/calculadora-horas-extras" className="text-sm hover:text-white transition-colors">
                   Horas Extras
                </Link>
              </li>
              <li>
                <Link href="/tabelas-inss-irpf" className="text-sm hover:text-white transition-colors">
                  Tabelas INSS e IRPF
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Coluna 3: Financeiro e Datas --- */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Financeiro & Datas</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/calculadora-juros-simples" className="text-sm hover:text-white transition-colors">
                  Juros Simples
                </Link>
              </li>
              <li>
                <Link href="/calculadora-dias-entre-datas" className="text-sm hover:text-white transition-colors">
                  Dias entre Datas
                </Link>
              </li>
              <li>
                <Link href="/calculadora-dias-uteis" className="text-sm hover:text-white transition-colors">
                  Dias Úteis (Feriados)
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Coluna 4: Institucional --- */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Institucional</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre" className="text-sm hover:text-white transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-sm hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Barra Inferior: Copyright --- */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Calculo.App. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0 text-xs text-gray-500">v1.2.0 (2025 Update)</p>
        </div>
      </div>
    </footer>
  );
}