"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para mudar a sombra do header ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu móvel ao mudar de rota
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Função auxiliar para verificar se o link está ativo (inclusive sub-rotas)
  const isActive = (path: string) => pathname.startsWith(path);

  // Classes CSS para links de navegação desktop
  const navLinkClasses = (path: string) =>
    `text-base font-medium transition-colors duration-200 ${
      isActive(path)
        ? "text-blue-700 font-semibold"
        : "text-gray-700 hover:text-blue-600"
    }`;

  // Classes CSS para links de navegação mobile
  const mobileNavLinkClasses = (path: string) =>
    `block pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
      isActive(path)
        ? "bg-blue-50 border-blue-600 text-blue-700"
        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
    }`;

  // Ícones SVG
  const Bars3Icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );

  const XMarkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-7 h-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const ChevronDownIcon = (
    <svg
      className="ml-1 h-5 w-5 transition-transform duration-200 group-hover:rotate-180 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  const LogoIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.25-4.5h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5v-.008zm2.25-4.5h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75v-.008zm2.25-4.5h.008v.008H15v-.008zm0 2.25h.008v.008H15v-.008zm0 2.25h.008v.008H15v-.008zM2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M4.5 12.75h.008v.008H4.5v-.008zm0 2.25h.008v.008H4.5v-.008z"
      />
    </svg>
  );

  return (
    <header
      className={`bg-white sticky top-0 z-40 transition-all duration-300 border-b border-gray-100 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 lg:h-20">
          {/* Logo e Título */}
          <div className="flex">
            <Link
              href="/"
              // CORREÇÃO AQUI: alterado de flex-shrink-0 para shrink-0
              className="shrink-0 flex items-center group"
              aria-label="Voltar para a página inicial"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm group-hover:bg-blue-700 transition-colors">
                {LogoIcon}
              </div>
              <span className="font-bold text-2xl text-gray-900">
                Calculo.App
              </span>
            </Link>
          </div>

          {/* Navegação Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className={navLinkClasses("/")}>
              Início
            </Link>

            {/* Dropdown Trabalhista */}
            <div className="relative group h-full flex items-center">
              <button
                className={`inline-flex items-center ${navLinkClasses(
                  "/calculadora-salario"
                )} outline-none`}
              >
                Trabalhista
                {ChevronDownIcon}
              </button>
              <div className="absolute left-0 top-full mt-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    <Link
                      href="/calculadora-salario-liquido"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all"
                    >
                      Salário Líquido 2025
                    </Link>
                    <Link
                      href="/calculadora-ferias"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all"
                    >
                      Férias
                    </Link>
                    <Link
                      href="/calculadora-rescisao"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all"
                    >
                      Rescisão CLT
                    </Link>
                    <Link
                      href="/calculadora-horas-extras"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all"
                    >
                      Horas Extras
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link
                        href="/tabelas-inss-irpf"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all font-medium"
                      >
                        Tabelas INSS e IRPF
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Financeiro (COMPLETO) */}
            <div className="relative group h-full flex items-center">
              <button
                className={`inline-flex items-center ${navLinkClasses(
                  "/calculadora-p"
                )} outline-none`}
              >
                Financeiro
                {ChevronDownIcon}
              </button>
              <div className="absolute left-0 top-full mt-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    <Link
                      href="/calculadora-porcentagem"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all"
                    >
                      Calculadora de Porcentagem
                    </Link>
                    <Link
                      href="/calculadora-juros-simples"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all"
                    >
                      Juros Simples
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Datas */}
            <div className="relative group h-full flex items-center">
              <button
                className={`inline-flex items-center ${navLinkClasses(
                  "/calculadora-dias"
                )} outline-none`}
              >
                Datas
                {ChevronDownIcon}
              </button>
              <div className="absolute left-0 top-full mt-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    <Link
                      href="/calculadora-dias-uteis"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all"
                    >
                      Dias Úteis
                    </Link>
                    <Link
                      href="/calculadora-dias-entre-datas"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all"
                    >
                      Dias entre Datas
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/contato" className={navLinkClasses("/contato")}>
              Contato
            </Link>
          </div>

          {/* Botão do Menu Mobile */}
          <div className="-mr-2 flex md:hidden items-center">
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMobileMenuOpen ? XMarkIcon : Bars3Icon}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClasses("/")}
            >
              Início
            </Link>

            {/* Seção Trabalhista Mobile */}
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Trabalhista
              </p>
              <div className="mt-2 space-y-1">
                <Link
                  href="/calculadora-salario-liquido"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses(
                    "/calculadora-salario-liquido"
                  )}
                >
                  Salário Líquido 2025
                </Link>
                <Link
                  href="/calculadora-ferias"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/calculadora-ferias")}
                >
                  Férias
                </Link>
                <Link
                  href="/calculadora-rescisao"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/calculadora-rescisao")}
                >
                  Rescisão CLT
                </Link>
                <Link
                  href="/calculadora-horas-extras"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/calculadora-horas-extras")}
                >
                  Horas Extras
                </Link>
                <Link
                  href="/tabelas-inss-irpf"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/tabelas-inss-irpf")}
                >
                  Tabelas INSS e IRPF
                </Link>
              </div>
            </div>

            {/* Seção Financeiro Mobile (COMPLETO) */}
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Financeiro
              </p>
              <div className="mt-2 space-y-1">
                <Link
                  href="/calculadora-porcentagem"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/calculadora-porcentagem")}
                >
                  Calculadora de Porcentagem
                </Link>
                <Link
                  href="/calculadora-juros-simples"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/calculadora-juros-simples")}
                >
                  Juros Simples
                </Link>
              </div>
            </div>

            {/* Seção Datas Mobile */}
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Datas
              </p>
              <div className="mt-2 space-y-1">
                <Link
                  href="/calculadora-dias-uteis"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/calculadora-dias-uteis")}
                >
                  Dias Úteis
                </Link>
                <Link
                  href="/calculadora-dias-entre-datas"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses(
                    "/calculadora-dias-entre-datas"
                  )}
                >
                  Dias entre Datas
                </Link>
              </div>
            </div>

            {/* Seção Institucional Mobile */}
            <div className="pt-4 pb-4 border-t border-gray-100 mt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Institucional
              </p>
              <div className="mt-2 space-y-1 pl-2">
                <Link
                  href="/sobre"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/sobre")}
                >
                  Quem Somos
                </Link>
                <Link
                  href="/contato"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={mobileNavLinkClasses("/contato")}
                >
                  Contato
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}