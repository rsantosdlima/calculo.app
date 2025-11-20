import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Cálculo<span className="text-gray-800">.App</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Início
            </Link>
            <div className="relative group">
               <button className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Calculadoras
               </button>
               <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
                  <Link href="/calculadora-salario-liquido" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Salário Líquido</Link>
                  <Link href="/calculadora-juros-simples" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Juros Simples</Link>
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
