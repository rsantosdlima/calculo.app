import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto print:hidden">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* GRID SYSTEM:
           - Mobile (<768px): 2 colunas.
           - Tablet/Notebook (md >= 768px): 4 colunas.
           - Desktop Grande (lg >= 1024px): 6 colunas.
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 xl:gap-12">
          
          {/* --- Coluna 1: Sobre Nós ---
             - md:col-span-4 (CORREÇÃO: Ocupa a linha INTEIRA em tablets, forçando links para baixo)
             - lg:col-span-2 (Volta para a lateral em telas grandes)
          */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              Cálculo<span className="text-blue-500">.App</span>
            </h3>
            <p className="text-sm leading-6 mb-4 max-w-md text-gray-400">
              Simulações trabalhistas, financeiras e de datas. Ferramentas gratuitas, rápidas e precisas para facilitar o seu dia a dia.
            </p>
          </div>

          {/* --- Coluna 2: Trabalhistas --- */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Trabalhistas</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/calculadora-rescisao" className="text-sm hover:text-white transition-colors">
                  Rescisão CLT
                </Link>
              </li>
              <li>
                <Link href="/calculadora-ferias" className="text-sm hover:text-white transition-colors">
                  Férias
                </Link>
              </li>
              <li>
                <Link href="/calculadora-decimo-terceiro" className="text-sm hover:text-white transition-colors">
                  Décimo Terceiro
                </Link>
              </li>
              <li>
                <Link href="/calculadora-salario-liquido" className="text-sm hover:text-white transition-colors">
                  Salário Líquido
                </Link>
              </li>
              <li>
                <Link href="/calculadora-seguro-desemprego" className="text-sm hover:text-white transition-colors">
                  Seguro-Desemprego
                </Link>
              </li>
              <li>
                <Link href="/comparativo-clt-pj" className="text-sm hover:text-white transition-colors">
                  Comparativo CLT x PJ
                </Link>
              </li>
              <li>
                <Link href="/conversor-salario" className="text-sm hover:text-white transition-colors">
                  Conversor de Salário
                </Link>
              </li>
              <li>
                <Link href="/calculadora-horas-extras" className="text-sm hover:text-white transition-colors">
                   Horas Extras
                </Link>
              </li>
              <li>
                <Link href="/calculadora-irrf-2026" className="text-sm hover:text-white transition-colors text-blue-400 font-medium">
                  Simulação IRRF 2026
                </Link>
              </li>
              <li>
                <Link href="/tabelas-inss-irpf" className="text-sm hover:text-white transition-colors">
                  Tabelas INSS e IRPF
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Coluna 3: Financeiro --- */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Financeiro</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/calculadora-porcentagem" className="text-sm hover:text-white transition-colors">
                  Porcentagem
                </Link>
              </li>
              <li>
                <Link href="/calculadora-juros-simples" className="text-sm hover:text-white transition-colors">
                  Juros Simples
                </Link>
              </li>
              <li>
                <Link href="/calculadora-juros-compostos" className="text-sm hover:text-white transition-colors">
                  Juros Compostos
                </Link>
              </li>
              <li>
                <Link href="/simulador-financiamento" className="text-sm hover:text-white transition-colors">
                  Financiamento
                </Link>
              </li>
              <li>
                <Link href="/calculadora-antecipacao-parcelas" className="text-sm hover:text-white transition-colors">
                  Antecipação de Parcelas
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Coluna 4: Datas --- */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Datas</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/calculadora-dias-uteis" className="text-sm hover:text-white transition-colors">
                  Dias Úteis
                </Link>
              </li>
              <li>
                <Link href="/calculadora-dias-entre-datas" className="text-sm hover:text-white transition-colors">
                  Dias entre Datas
                </Link>
              </li>
              <li>
                <Link href="/calculadora-idade" className="text-sm hover:text-white transition-colors">
                  Calculadora de Idade
                </Link>
              </li>
              <li>
                <Link href="/somar-dias-data" className="text-sm hover:text-white transition-colors">
                  Somar Dias
                </Link>
              </li>
              <li>
                <Link href="/calculadora-horas" className="text-sm hover:text-white transition-colors">
                  Calculadora de Horas
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Coluna 5: Institucional --- */}
          <div className="col-span-1">
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

        {/* --- Barra Inferior --- */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Calculo.App. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0 text-xs text-gray-500">v1.6.0</p>
        </div>
      </div>
    </footer>
  );
}