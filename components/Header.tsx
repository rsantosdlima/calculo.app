"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const isActive = (path: string) => pathname.startsWith(path);

  const navLinkClasses = (path: string) =>
    `text-base font-medium transition-colors duration-200 ${isActive(path)
      ? "text-blue-700 font-semibold"
      : "text-gray-700 hover:text-blue-600"
    }`;

  const mobileNavLinkClasses = (path: string) =>
    `block pl-3 pr-4 py-3 border-l-4 text-base font-medium ${isActive(path)
      ? "bg-blue-50 border-blue-600 text-blue-700"
      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
    }`;

  const Bars3Icon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );

  const XMarkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const ChevronDownIcon = (
    <svg className="ml-1 h-5 w-5 transition-transform duration-200 group-hover:rotate-180 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <header className={`bg-white sticky top-0 z-40 transition-all duration-300 border-b border-gray-100 ${isScrolled ? "shadow-md" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 lg:h-20">

          {/* Logo */}
          <div className="flex">
            <Link href="/" className="shrink-0 flex items-center group" aria-label="Voltar para a página inicial">
              <Image
                src="/logo-header.png"
                alt="Logo Calculo.App"
                width={160}
                height={40}
                className="h-10 w-auto mr-3 object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className={navLinkClasses("/")}>Início</Link>

            {/* Dropdown Trabalhista */}
            <div className="relative group h-full flex items-center">
              <button className={`inline-flex items-center ${navLinkClasses("/calculadora-")} outline-none`}>
                Trabalhista {ChevronDownIcon}
              </button>
              <div className="absolute left-0 top-full mt-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden max-h-[80vh] overflow-y-auto">
                  <div className="py-2">
                    <Link href="/calculadora-rescisao" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Rescisão CLT
                    </Link>
                    <Link href="/calculadora-salario-liquido" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Salário Líquido 2026
                    </Link>
                    <Link href="/calculadora-multiplos-vinculos" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Múltiplos Vínculos
                    </Link>
                    <Link href="/calculadora-ferias" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Calculadora de Férias
                    </Link>
                    <Link href="/calculadora-decimo-terceiro" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Décimo Terceiro
                    </Link>
                    <Link href="/calculadora-horas-extras" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Horas Extras
                    </Link>
                    <Link href="/calculadora-seguro-desemprego" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Seguro-Desemprego
                    </Link>
                    <Link href="/calculadora-irrf-2026" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all font-medium text-blue-800">
                      Simulação IRRF 2026
                    </Link>
                    <Link href="/comparativo-clt-pj" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Comparativo CLT x PJ
                    </Link>
                    <Link href="/calculadora-dsr-comissao" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      DSR sobre Comissão
                    </Link>
                    <Link href="/conversor-salario" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Conversor de Salário
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link href="/tabelas-inss-irpf" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all font-medium">
                        Tabelas INSS e IRPF
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Financeiro */}
            <div className="relative group h-full flex items-center">
              <button className={`inline-flex items-center ${navLinkClasses("/calculadora-p")} outline-none`}>
                Financeiro {ChevronDownIcon}
              </button>
              <div className="absolute left-0 top-full mt-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    <Link href="/calculadora-porcentagem" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Calculadora de Porcentagem
                    </Link>
                    <Link href="/calculadora-juros-compostos" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Juros Compostos
                    </Link>
                    <Link href="/calculadora-juros-simples" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Juros Simples
                    </Link>
                    <Link href="/simulador-financiamento" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Simulador de Financiamento
                    </Link>
                    <Link href="/conversor-moedas" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Conversor de Moedas
                    </Link>
                    <Link href="/calculadora-antecipacao-parcelas" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Antecipação de Parcelas
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Datas */}
            <div className="relative group h-full flex items-center">
              <button className={`inline-flex items-center ${navLinkClasses("/calculadora-dias")} outline-none`}>
                Datas {ChevronDownIcon}
              </button>
              <div className="absolute left-0 top-full mt-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    <Link href="/calculadora-dias-uteis" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Dias Úteis
                    </Link>
                    <Link href="/calculadora-dias-entre-datas" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Dias entre Datas
                    </Link>
                    <Link href="/calculadora-horas" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Calculadora de Horas
                    </Link>
                    <Link href="/somar-dias-data" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Somar Dias
                    </Link>
                    <Link href="/calculadora-idade" className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border-l-4 border-transparent hover:border-blue-600 transition-all">
                      Calculadora de Idade
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/contato" className={navLinkClasses("/contato")}>Contato</Link>
          </div>

          {/* Botão Menu Mobile */}
          <div className="-mr-2 flex md:hidden items-center">
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {isMobileMenuOpen ? XMarkIcon : Bars3Icon}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/")}>Início</Link>

            {/* Seção Trabalhista */}
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Trabalhista</p>
              <div className="mt-2 space-y-1">
                <Link href="/calculadora-rescisao" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-rescisao")}>Rescisão CLT</Link>
                <Link href="/calculadora-salario-liquido" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-salario-liquido")}>Salário Líquido 2026</Link>
                <Link href="/calculadora-multiplos-vinculos" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-multiplos-vinculos")}>Múltiplos Vínculos</Link>
                <Link href="/calculadora-ferias" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-ferias")}>Calculadora de Férias</Link>
                <Link href="/calculadora-decimo-terceiro" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-decimo-terceiro")}>Décimo Terceiro</Link>
                <Link href="/calculadora-horas-extras" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-horas-extras")}>Horas Extras</Link>
                <Link href="/calculadora-seguro-desemprego" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-seguro-desemprego")}>Seguro-Desemprego</Link>
                <Link href="/calculadora-irrf-2026" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-irrf-2026")}>Simulação IRRF 2026</Link>
                <Link href="/comparativo-clt-pj" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/comparativo-clt-pj")}>Comparativo CLT x PJ</Link>
                <Link href="/calculadora-dsr-comissao" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-dsr-comissao")}>DSR sobre Comissão</Link>
                <Link href="/conversor-salario" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/conversor-salario")}>Conversor de Salário</Link>
                <Link href="/tabelas-inss-irpf" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/tabelas-inss-irpf")}>Tabelas INSS e IRPF</Link>
              </div>
            </div>

            {/* Seção Financeiro */}
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Financeiro</p>
              <div className="mt-2 space-y-1">
                <Link href="/calculadora-porcentagem" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-porcentagem")}>Calculadora de Porcentagem</Link>
                <Link href="/calculadora-juros-compostos" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-juros-compostos")}>Juros Compostos</Link>
                <Link href="/calculadora-juros-simples" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-juros-simples")}>Juros Simples</Link>
                <Link href="/simulador-financiamento" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/simulador-financiamento")}>Simulador de Financiamento</Link>
                <Link href="/conversor-moedas" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/conversor-moedas")}>Conversor de Moedas</Link>
                <Link href="/calculadora-antecipacao-parcelas" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-antecipacao-parcelas")}>Antecipação de Parcelas</Link>
              </div>
            </div>

            {/* Seção Datas */}
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Datas</p>
              <div className="mt-2 space-y-1">
                <Link href="/calculadora-dias-uteis" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-dias-uteis")}>Dias Úteis</Link>
                <Link href="/calculadora-dias-entre-datas" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-dias-entre-datas")}>Dias entre Datas</Link>
                <Link href="/calculadora-horas" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-horas")}>Calculadora de Horas</Link>
                <Link href="/somar-dias-data" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/somar-dias-data")}>Somar Dias</Link>
                <Link href="/calculadora-idade" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/calculadora-idade")}>Calculadora de Idade</Link>
              </div>
            </div>

            <div className="pt-4 pb-4 border-t border-gray-100 mt-4">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Institucional</p>
              <div className="mt-2 space-y-1 pl-2">
                <Link href="/sobre" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/sobre")}>Quem Somos</Link>
                <Link href="/contato" onClick={() => setIsMobileMenuOpen(false)} className={mobileNavLinkClasses("/contato")}>Contato</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}