export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-gray-300 text-sm">
              Calculo.App oferece ferramentas de simulação e cálculo para facilitar o seu dia a dia.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white">Início</a></li>
              <li><a href="/privacidade" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="/termos" className="hover:text-white">Termos de Uso</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-gray-300 text-sm">
              Dúvidas ou sugestões? Entre em contato conosco.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400 flex justify-between flex-col md:flex-row items-center">
          <span>&copy; {new Date().getFullYear()} Calculo.App. Todos os direitos reservados.</span>
          <span className="text-gray-600 text-xs mt-2 md:mt-0">v1.1.0 (2025 Update)</span>
        </div>
      </div>
    </footer>
  );
}
