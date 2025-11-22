"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// IMPORTANTE: Importando o componente de imagem otimizado do Next.js
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) =>
    pathname === path
      ? "text-blue-600 bg-blue-50 font-semibold"
      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50";

  const Bars3Icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
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
      className="w-6 h-6"
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
      className="ml-1 h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 relative z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* --- LOGO --- */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" onClick={closeMobileMenu}>
              <span className="sr-only">Cálculo.App Início</span>
              {/* SUBSTITUIÇÃO DO TEXTO PELA IMAGEM */}
              <Image
                src="/logo-header.png" // Caminho da imagem na pasta public
                alt="Calculo.App Logo"
                width={180} // Largura base estimada (o CSS h-10 w-auto vai controlar o tamanho real)
                height={40} // Altura base estimada
                className="h-10 w-auto" // Tailwind: define altura fixa de 2.5rem e largura automática proporcional
                priority // Carrega com prioridade máxima para não piscar
              />
            </Link>
          </div>

          {/* --- NAVEGAÇÃO DESKTOP --- */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Início
            </Link>

            {/* Trabalhistas Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 group-hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Trabalhistas
                {ChevronDownIcon}
              </button>
              <div
                className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible border border-gray-100 origin-top-left transform scale-95 group-hover:scale-100"
                aria-label="Submenu Trabalhistas"
              >
                <Link
                  href="/calculadora-salario-liquido"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Salário Líquido 2025
                </Link>
                <Link
                  href="/calculadora-irrf-2026"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Simulação IRRF 2026
                </Link>
                <Link
                  href="/calculadora-horas-extras"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Horas Extras
                </Link>
                {/* MOVIDO PARA CÁ: Tabelas Oficiais */}
                <Link
                  href="/tabelas-inss-irpf"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-t border-gray-100 mt-2 pt-2"
                >
                  Tabelas Oficiais
                </Link>
              </div>
            </div>

            {/* Financeiros Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 group-hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Financeiros
                {ChevronDownIcon}
              </button>
              <div
                className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible border border-gray-100 origin-top-left transform scale-95 group-hover:scale-100"
                aria-label="Submenu Financeiros"
              >
                <Link
                  href="/calculadora-juros-simples"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Juros Simples
                </Link>
              </div>
            </div>

            {/* Datas Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 group-hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Datas
                {ChevronDownIcon}
              </button>
              <div
                className="absolute left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible border border-gray-100 origin-top-left transform scale-95 group-hover:scale-100"
                aria-label="Submenu Datas"
              >
                <Link
                  href="/calculadora-dias-entre-datas"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Dias entre Datas
                </Link>
                <Link
                  href="/calculadora-dias-uteis"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Dias Úteis
                </Link>
              </div>
            </div>

            {/* Institucional Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 group-hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center focus:outline-none"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sobre
                {ChevronDownIcon}
              </button>
              <div
                className="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 group-hover:opacity-100 transition-all duration-200 invisible group-hover:visible border border-gray-100 origin-top-right transform scale-95 group-hover:scale-100"
                aria-label="Submenu Institucional"
              >
                <Link
                  href="/sobre"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Quem Somos
                </Link>
                <Link
                  href="/contato"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  Contato
                </Link>
                {/* LINK REMOVIDO DAQUI */}
              </div>
            </div>
          </nav>

          {/* --- BOTÃO MENU MOBILE --- */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMobileMenuOpen ? XMarkIcon : Bars3Icon}
            </button>
          </div>
        </div>
      </div>

      {/* --- MENU MOBILE RETRÁTIL --- */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto shadow-lg"
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                "/"
              )}`}
            >
              Início
            </Link>

            {/* Grupo Trabalhistas Mobile */}
            <div className="pt-4 pb-2">
              <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Trabalhistas
              </span>
              <div className="mt-2 space-y-1 pl-2">
                <Link
                  href="/calculadora-salario-liquido"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/calculadora-salario-liquido")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Salário Líquido 2025
                </Link>
                <Link
                  href="/calculadora-irrf-2026"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/calculadora-irrf-2026")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Simulação IRRF 2026
                </Link>
                <Link
                  href="/calculadora-horas-extras"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/calculadora-horas-extras")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Horas Extras
                </Link>
                {/* MOVIDO PARA CÁ (Mobile) */}
                <Link
                  href="/tabelas-inss-irpf"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-t border-gray-100 mt-2 pt-2 ${
                    isActive("/tabelas-inss-irpf")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Tabelas Oficiais
                </Link>
              </div>
            </div>

            {/* Grupo Financeiros Mobile */}
            <div className="pt-4 pb-2">
              <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Financeiros
              </span>
              <div className="mt-2 space-y-1 pl-2">
                <Link
                  href="/calculadora-juros-simples"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/calculadora-juros-simples")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Juros Simples
                </Link>
              </div>
            </div>

            {/* Grupo Datas Mobile */}
            <div className="pt-4 pb-2">
              <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Datas
              </span>
              <div className="mt-2 space-y-1 pl-2">
                <Link
                  href="/calculadora-dias-entre-datas"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/calculadora-dias-entre-datas")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Dias entre Datas
                </Link>
                <Link
                  href="/calculadora-dias-uteis"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/calculadora-dias-uteis")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Dias Úteis
                </Link>
              </div>
            </div>

            {/* Grupo Institucional Mobile */}
            <div className="pt-4 pb-4 border-t border-gray-100 mt-4">
              <span className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Institucional
              </span>
              <div className="mt-2 space-y-1 pl-2">
                {/* LINK REMOVIDO DAQUI (Mobile) */}
                <Link
                  href="/sobre"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/sobre")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  Quem Somos
                </Link>
                <Link
                  href="/contato"
                  onClick={closeMobileMenu}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive("/contato")
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
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