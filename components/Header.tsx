import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Cálculo<span className="text-gray-800">.App.br</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Início
            </Link>

            {/* Trabalhistas */}
            <div className="relative group">
               <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Trabalhistas
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </button>
               <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible border border-gray-100">
                  <Link href="/calculadora-salario-liquido" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Salário Líquido
                  </Link>
                  {/* Future: Rescisão, Férias */}
               </div>
            </div>

            {/* Financeiros */}
            <div className="relative group">
               <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Financeiros
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </button>
               <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible border border-gray-100">
                  <Link href="/calculadora-juros-simples" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    Juros Simples
                  </Link>
                  {/* Future: Financiamento */}
               </div>
            </div>

            {/* Datas */}
            <div className="relative group">
               <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Datas
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </button>
               <div className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible border border-gray-100">
                  <span className="block px-4 py-2 text-sm text-gray-400 cursor-default">
                    Dias entre Datas (Em breve)
                  </span>
               </div>
            </div>

            <Link href="/sobre" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
