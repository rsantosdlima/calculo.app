"use client";

import { useState } from "react";
import {
    INSS_TABLE,
    IRRF_TABLE,
    DEPENDENT_DEDUCTION,
    IRRF_SIMPLIFIED_DISCOUNT,
    INSS_CEILING,
} from "@/lib/tax-tables";
import { PlusCircle, Trash2, AlertTriangle, Info, Calculator } from "lucide-react";

interface CalculationResult {
    grossSalary: number;
    inssDiscount: number; // Total INSS informado pelo usuário
    irrfDiscount: number;
    netSalary: number;
    irrfBase: number;
    usedSimplifiedDiscount: boolean;
    inssCeilingExceeded: boolean;
    expectedINSS: number; // INSS que deveria ser pago com base na soma dos salários
    inssDifference: number; // Diferença entre o esperado e o pago
}

interface Bond {
    id: number;
    gross: string;
    inss: string;
}

export default function MultipleBondsCalculator() {
    const [dependents, setDependents] = useState("0");
    const [otherDiscountsStr, setOtherDiscountsStr] = useState("0");
    const [bonds, setBonds] = useState<Bond[]>([{ id: 1, gross: "", inss: "" }]);
    const [result, setResult] = useState<CalculationResult | null>(null);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    // --- LÓGICA DE CÁLCULO DO INSS (Para calcular o esperado) ---
    const calculateExpectedINSS = (grossSalary: number) => {
        let totalINSS = 0;
        // Verifica teto
        if (grossSalary > INSS_CEILING) {
            const lastBracket = INSS_TABLE[INSS_TABLE.length - 1];
            return lastBracket.limit * lastBracket.rate - lastBracket.deduction;
        }

        for (const bracket of INSS_TABLE) {
            if (grossSalary > bracket.limit) {
                totalINSS = bracket.limit * bracket.rate - bracket.deduction;
            } else {
                totalINSS = grossSalary * bracket.rate - bracket.deduction;
                break;
            }
        }
        return totalINSS;
    };

    // Calcula o Teto do INSS
    const calculateMaxINSS = () => {
        const lastBracket = INSS_TABLE[INSS_TABLE.length - 1];
        return lastBracket.limit * lastBracket.rate - lastBracket.deduction;
    };

    // --- LÓGICA DE CÁLCULO DO IRRF ---
    const calculateIRRF = (baseSalary: number) => {
        if (baseSalary <= 0) return 0;
        for (const bracket of IRRF_TABLE) {
            if (bracket.limit === null || baseSalary <= bracket.limit) {
                return baseSalary * bracket.rate - bracket.deduction;
            }
        }
        return 0;
    };

    // --- HANDLERS ---
    const addBond = () => {
        setBonds([...bonds, { id: Date.now(), gross: "", inss: "" }]);
    };

    const removeBond = (id: number) => {
        if (bonds.length > 1) {
            setBonds(bonds.filter((bond) => bond.id !== id));
        }
    };

    const updateBond = (id: number, field: "gross" | "inss", value: string) => {
        setBonds(
            bonds.map((bond) =>
                bond.id === id ? { ...bond, [field]: value } : bond
            )
        );
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        const numDependents = parseInt(dependents) || 0;
        const otherDiscounts = parseFloat(otherDiscountsStr.replace(/\./g, "").replace(",", ".")) || 0;

        let totalGross = 0;
        let totalINSSPaid = 0;
        let validBonds = true;

        bonds.forEach(bond => {
            const g = parseFloat(bond.gross.replace(/\./g, "").replace(",", ".")) || 0;
            const i = parseFloat(bond.inss.replace(/\./g, "").replace(",", ".")) || 0;
            if (g <= 0) validBonds = false;
            totalGross += g;
            totalINSSPaid += i;
        });

        if (!validBonds) {
            alert("Por favor, preencha o salário bruto de todos os vínculos.");
            return;
        }

        // 1. Verifica Teto e Diferença de INSS
        const maxINSS = calculateMaxINSS();
        const expectedINSS = calculateExpectedINSS(totalGross);

        let inssCeilingExceeded = false;
        if (totalINSSPaid > maxINSS + 1) { // margem de erro
            inssCeilingExceeded = true;
        }

        const inssDifference = expectedINSS - totalINSSPaid;

        // 2. Cálculo do IRRF (Sobre a soma dos rendimentos)
        const totalDependentDeduction = numDependents * DEPENDENT_DEDUCTION;

        // Base Legal: Bruto Total - INSS Pago (ou Teto se exceder?) 
        // *Regra*: O IRRF deduz o INSS efetivamente pago ou o teto. 
        // Se pagou a mais, deduz o que pagou (até recuperar). Mas para simulação correta do líquido hoje, usamos o pago.
        const irrfBaseLegal = totalGross - totalINSSPaid - totalDependentDeduction;
        const irrfLegal = calculateIRRF(irrfBaseLegal);

        const irrfBaseSimplified = totalGross - IRRF_SIMPLIFIED_DISCOUNT;
        const irrfSimplified = calculateIRRF(irrfBaseSimplified);

        let irrfDiscount = 0;
        let usedSimplified = false;
        let finalIrrfBase = 0;

        if (irrfSimplified < irrfLegal && irrfSimplified >= 0) {
            irrfDiscount = irrfSimplified;
            usedSimplified = true;
            finalIrrfBase = irrfBaseSimplified;
        } else {
            irrfDiscount = Math.max(0, irrfLegal);
            usedSimplified = false;
            finalIrrfBase = irrfBaseLegal;
        }

        const netSalary = totalGross - totalINSSPaid - irrfDiscount - otherDiscounts;

        setResult({
            grossSalary: totalGross,
            inssDiscount: totalINSSPaid,
            irrfDiscount,
            netSalary,
            irrfBase: Math.max(0, finalIrrfBase),
            usedSimplifiedDiscount: usedSimplified,
            inssCeilingExceeded,
            expectedINSS,
            inssDifference
        });
    };

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 my-8">
            <div className="flex items-center mb-6">
                <div className="p-2 bg-blue-100 rounded-lg mr-3 text-blue-600">
                    <Calculator className="w-6 h-6" />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Calculadora de Múltiplos Vínculos
                </h2>
            </div>

            <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800 flex items-start mb-6 border border-blue-100">
                <Info className="w-5 h-5 mr-2 shrink-0 mt-0.5" />
                <p>
                    Esta ferramenta ajuda quem possui mais de um emprego (CLT) a entender o impacto no IRRF e verificar se o recolhimento do INSS está correto.
                    <br /><br />
                    Informe a remuneração bruta e o valor <strong>já descontado</strong> de INSS em cada vínculo (consulte seus holerites).
                </p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">

                <div className="space-y-4">
                    {bonds.map((bond, index) => (
                        <div key={bond.id} className="flex gap-4 items-end bg-gray-50 p-4 rounded-md border border-gray-200 relative group">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                                    Vínculo {index + 1} - Salário Bruto
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: 3.000,00"
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                    value={bond.gross}
                                    onChange={(e) => updateBond(bond.id, "gross", e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wide">
                                    Desconto INSS (Holerite)
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ex: 300,00"
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 text-sm"
                                    value={bond.inss}
                                    onChange={(e) => updateBond(bond.id, "inss", e.target.value)}
                                />
                            </div>
                            {bonds.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeBond(bond.id)}
                                    className="absolute -top-2 -right-2 bg-red-100 text-red-500 p-1 rounded-full hover:bg-red-200 transition-colors shadow-sm"
                                    title="Remover vínculo"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addBond}
                        className="flex items-center text-sm text-blue-600 font-bold hover:text-blue-800 transition-colors py-2"
                    >
                        <PlusCircle className="w-4 h-4 mr-1" />
                        ADICIONAR OUTRO VÍNCULO
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                        <label htmlFor="mb-dependents" className="block text-sm font-medium text-gray-700 mb-1">
                            Número de Dependentes
                        </label>
                        <input
                            type="number"
                            id="mb-dependents"
                            min="0"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900"
                            value={dependents}
                            onChange={(e) => setDependents(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="mb-others" className="block text-sm font-medium text-gray-700 mb-1">
                            Outros Descontos (R$) <span className="text-gray-400 text-xs">(opcional)</span>
                        </label>
                        <input
                            type="text"
                            id="mb-others"
                            placeholder="Ex: Pensão, Plano de saúde..."
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white text-gray-900"
                            value={otherDiscountsStr}
                            onChange={(e) => setOtherDiscountsStr(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors shadow-md mt-4"
                >
                    Calcular Consolidação
                </button>
            </form>

            {result && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 animate-in fade-in duration-300 mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                        Resultado Consolidado
                    </h3>

                    {/* Alerta: INSS Pago a MAIOR (Teto Excedido) */}
                    {result.inssCeilingExceeded && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">Recolhimento acima do Teto</h3>
                                    <div className="mt-2 text-sm text-yellow-700">
                                        <p>
                                            A soma dos descontos de INSS ({formatCurrency(result.inssDiscount)}) ultrapassa o teto máximo de contribuição ({formatCurrency(calculateMaxINSS())}).
                                        </p>
                                        <p className="mt-2">
                                            <strong>Recomendação:</strong> Procure o RH de uma das empresas (geralmente a que paga menos ou a mais recente) e apresente o comprovante de vínculo da outra. Isso evitará que você pague INSS a mais indevidamente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Alerta: INSS Pago a MENOR (Necessário Complementar) */}
                    {result.inssDifference > 1 && ( // Margem de R$ 1,00
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertTriangle className="h-5 w-5 text-orange-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-orange-800">Recolhimento Inferior ao Devido</h3>
                                    <div className="mt-2 text-sm text-orange-700">
                                        <p>
                                            Com base na soma dos seus salários ({formatCurrency(result.grossSalary)}), o INSS devido seria de <strong>{formatCurrency(result.expectedINSS)}</strong>, mas você informou um desconto total de <strong>{formatCurrency(result.inssDiscount)}</strong>.
                                        </p>
                                        <p className="mt-2 font-bold">
                                            Diferença a recolher: {formatCurrency(result.inssDifference)}
                                        </p>
                                        <p className="mt-2">
                                            <strong>Ação Necessária:</strong> Como a soma dos vínculos altera a faixa de contribuição, você deve fazer o recolhimento dessa diferença através de uma guia avulsa (DARF/GPS) da Receita Federal para garantir sua cobertura previdenciária correta e evitar problemas com a malha fina.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3 text-sm pt-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Soma dos Salários Brutos:</span>
                            <span className="font-medium">{formatCurrency(result.grossSalary)}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                            <span>(-) INSS Total (Informado):</span>
                            <span>{formatCurrency(result.inssDiscount)}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                            <span>(-) IRRF (Sobre a soma):</span>
                            <span>{formatCurrency(result.irrfDiscount)}</span>
                        </div>
                        {parseFloat(otherDiscountsStr) > 0 && (
                            <div className="flex justify-between text-gray-500">
                                <span>(-) Outros Descontos:</span>
                                <span>{formatCurrency(parseFloat(otherDiscountsStr.replace(/\./g, "").replace(",", ".")))}</span>
                            </div>
                        )}

                        {result.usedSimplifiedDiscount && (
                            <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded mt-2">
                                * Foi aplicado o <strong>Desconto Simplificado</strong> do IRRF pois resultou em um imposto menor.
                            </p>
                        )}
                    </div>

                    <div className="mt-6 bg-white p-5 rounded-lg border-2 border-blue-100 text-center">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wide block mb-1">
                            Salário Líquido Consolidado
                        </span>
                        <span className="text-4xl font-extrabold text-blue-600">
                            {formatCurrency(result.netSalary)}
                        </span>
                        <p className="text-xs text-gray-400 mt-2">
                            (Soma dos líquidos de todos os vínculos)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
