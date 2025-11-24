import {
  INSS_TABLE,
  IRRF_TABLE,
  DEPENDENT_DEDUCTION,
  INSS_CEILING,
  IRRF_SIMPLIFIED_DISCOUNT
} from "./tax-tables";

export interface VacationParams {
  grossSalary: number;
  daysVacation: number; // Dias de gozo (ex: 30, 20, 15)
  sellDays: boolean;    // Se marcou "Vender 10 dias"
  advance13th: boolean; // Se marcou "Adiantar 13º"
  dependents: number;
}

export interface VacationResult {
  grossVacation: number;
  bonusOneThird: number;
  allowanceAmount: number; // Valor do abono (venda)
  allowanceOneThird: number; // 1/3 do abono
  advance13thAmount: number;
  totalGross: number;
  inssValue: number;
  irrfValue: number;
  totalNet: number;
  baseIrrf: number;
}

// --- Funções Auxiliares (Reutilizando lógica similar a de salário, mas isolada para segurança) ---

const calculateINSS = (baseValue: number): number => {
  if (baseValue > INSS_CEILING) {
    const lastBracket = INSS_TABLE[INSS_TABLE.length - 1];
    return lastBracket.limit * lastBracket.rate - lastBracket.deduction;
  }
  
  let totalINSS = 0;
  for (const bracket of INSS_TABLE) {
    if (baseValue > bracket.limit) {
      continue; // Procura a faixa correta no acumulado progressivo (mas usaremos a lógica simplificada da tabela progressiva real se necessário, aqui mantendo o padrão do seu projeto que usa dedução)
    }
    // A lógica de dedução da tabela do seu projeto já resolve a progressividade
    totalINSS = baseValue * bracket.rate - bracket.deduction;
    break;
  }
  // Fallback para a última faixa se passar de todas (mas < teto, o que é raro com a lógica acima)
  if (totalINSS === 0 && baseValue > 0) {
     const lastBracket = INSS_TABLE[INSS_TABLE.length - 1];
     totalINSS = baseValue * lastBracket.rate - lastBracket.deduction;
  }
  return totalINSS;
};

const calculateIRRF = (baseValue: number): number => {
  if (baseValue <= 0) return 0;
  for (const bracket of IRRF_TABLE) {
    if (bracket.limit === null || baseValue <= bracket.limit) {
      return baseValue * bracket.rate - bracket.deduction;
    }
  }
  return 0;
};

// --- Função Principal ---

export function calculateVacation(params: VacationParams): VacationResult {
  const { grossSalary, daysVacation, sellDays, advance13th, dependents } = params;

  // 1. Valor das Férias (Gozo)
  // Fórmula: (Salário / 30) * Dias de Gozo
  const grossVacation = (grossSalary / 30) * daysVacation;
  
  // 2. Adicional de 1/3 sobre Férias (Constitucional)
  const bonusOneThird = grossVacation / 3;

  // 3. Abono Pecuniário (Venda de 10 dias) - ISENTO DE TRIBUTAÇÃO
  // A lei permite vender até 1/3 do período total. Se o total é 30, vende 10.
  let allowanceAmount = 0;
  let allowanceOneThird = 0;
  
  if (sellDays) {
    // O cálculo do abono é sobre os dias vendidos (geralmente 10)
    // Nota: Se o usuário escolheu 20 dias de férias e "vender", assumimos que ele tinha 30 de direito.
    const soldDaysCount = 10; 
    allowanceAmount = (grossSalary / 30) * soldDaysCount;
    allowanceOneThird = allowanceAmount / 3;
  }

  // 4. Adiantamento 13º (Primeira Parcela) - SEM DESCONTOS NESTA ETAPA
  let advance13thAmount = 0;
  if (advance13th) {
    advance13thAmount = grossSalary / 2;
  }

  // 5. Bases de Cálculo para Impostos
  // Apenas as Férias de Gozo + 1/3 sofrem incidência. Abono e Adiantamento 13º não.
  const taxBase = grossVacation + bonusOneThird;

  // 6. Cálculo INSS
  const inssValue = calculateINSS(taxBase);

  // 7. Cálculo IRRF
  // Base Legal: Base Tributável - INSS - Dependentes
  const dependentsDeduction = dependents * DEPENDENT_DEDUCTION;
  const irrfBaseLegal = taxBase - inssValue - dependentsDeduction;
  const irrfLegal = calculateIRRF(irrfBaseLegal);

  // Base Simplificada: Base Tributável - Desconto Padrão
  const irrfBaseSimplified = taxBase - IRRF_SIMPLIFIED_DISCOUNT;
  const irrfSimplified = calculateIRRF(irrfBaseSimplified);

  // Escolhe o menor IRRF (mais vantajoso)
  let irrfValue = Math.min(Math.max(0, irrfLegal), Math.max(0, irrfSimplified));
  
  // Define qual base foi usada para exibição (informativo)
  const finalIrrfBase = (irrfSimplified < irrfLegal && irrfSimplified >= 0) ? irrfBaseSimplified : irrfBaseLegal;

  // 8. Total Líquido
  const totalGross = grossVacation + bonusOneThird + allowanceAmount + allowanceOneThird + advance13thAmount;
  const totalNet = totalGross - inssValue - irrfValue;

  return {
    grossVacation,
    bonusOneThird,
    allowanceAmount,
    allowanceOneThird,
    advance13thAmount,
    totalGross,
    inssValue,
    irrfValue,
    totalNet,
    baseIrrf: Math.max(0, finalIrrfBase)
  };
}