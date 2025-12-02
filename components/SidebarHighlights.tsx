"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const TOOLS = [
    { href: "/calculadora-rescisao", label: "Rescisão CLT", desc: "Calcule seu acerto trabalhista completo" },
    { href: "/calculadora-ferias", label: "Calculadora de Férias", desc: "Simule o valor exato das suas férias" },
    { href: "/calculadora-decimo-terceiro", label: "Décimo Terceiro", desc: "Veja quanto você vai receber de 13º" },
    { href: "/calculadora-horas-extras", label: "Horas Extras", desc: "Calcule o valor das suas horas extras" },
    { href: "/calculadora-seguro-desemprego", label: "Seguro-Desemprego", desc: "Confira valor e parcelas do benefício" },
    { href: "/comparativo-clt-pj", label: "Comparativo CLT x PJ", desc: "Descubra qual modelo vale mais a pena" },
    { href: "/calculadora-dsr-comissao", label: "DSR sobre Comissão", desc: "Cálculo essencial para comissionados" },
    { href: "/conversor-salario", label: "Conversor de Salário", desc: "Converta salário mensal, anual e por hora" },
    { href: "/calculadora-porcentagem", label: "Calculadora de Porcentagem", desc: "Faça cálculos de porcentagem facilmente" },
    { href: "/calculadora-juros-compostos", label: "Juros Compostos", desc: "Simule o rendimento dos seus investimentos" },
    { href: "/calculadora-dias-uteis", label: "Dias Úteis", desc: "Conte os dias de trabalho entre datas" },
    { href: "/calculadora-dias-entre-datas", label: "Dias entre Datas", desc: "Calcule o intervalo exato entre datas" },
    { href: "/somar-dias-data", label: "Somar Dias à Data", desc: "Calcule prazos e datas de vencimento" },
    { href: "/calculadora-multiplos-vinculos", label: "Múltiplos Vínculos", desc: "Cálculo para quem tem 2 ou mais empregos" },
    { href: "/calculadora-irrf-2026", label: "Simulação IRRF 2026", desc: "Antecipe-se às novas regras do IR" },
];

export default function SidebarHighlights() {
    const [randomTools, setRandomTools] = useState<typeof TOOLS>([]);

    useEffect(() => {
        // Embaralha a lista e pega 5 itens aleatórios
        const shuffled = [...TOOLS].sort(() => 0.5 - Math.random());
        setRandomTools(shuffled.slice(0, 5));
    }, []);

    // Renderização inicial (SSR) ou enquanto carrega: mostra um estado vazio ou skeleton simples
    // para evitar mismatch de hidratação, não renderizamos nada até o useEffect rodar
    if (randomTools.length === 0) {
        return (
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="pb-3 border-b border-gray-50 last:border-0">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">💡</span> Veja Também
            </h3>
            <ul className="space-y-4 text-sm">
                {randomTools.map((tool) => (
                    <li key={tool.href} className="pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                        <Link
                            href={tool.href}
                            className="group flex flex-col"
                            title={tool.desc}
                        >
                            <span className="font-bold text-blue-700 group-hover:underline">
                                {tool.label}
                            </span>
                            <span className="text-gray-500 text-xs mt-1">
                                {tool.desc}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
