import { calculateSimpleInterest } from '../interest-calculations';

describe('calculateSimpleInterest (Lógica de Juros Simples)', () => {

  it('deve calcular juros simples corretamente sem conversão de período (tudo em meses)', () => {
    // Cenário: R$ 1.000,00 a 1% ao mês por 12 meses
    // Esperado: Juros de R$ 120,00, Total de R$ 1.120,00
    const result = calculateSimpleInterest(1000, 1, 12, 'monthly', 'months');

    expect(result.totalInterest).toBe(120);
    expect(result.totalAmount).toBe(1120);
  });

  it('deve calcular corretamente quando a taxa é anual e o tempo é em meses (conversão de taxa)', () => {
    // Cenário: R$ 1.000,00 a 12% ao ANO por 6 meses
    // A taxa mensal efetiva é 1%. Em 6 meses, juros de R$ 60,00.
    const result = calculateSimpleInterest(1000, 12, 6, 'yearly', 'months');

    expect(result.totalInterest).toBe(60);
    expect(result.totalAmount).toBe(1060);
  });

  it('deve calcular corretamente quando a taxa é mensal e o tempo é em anos (conversão de tempo)', () => {
    // Cenário: R$ 2.000,00 a 2% ao MÊS por 2 ANOS (24 meses)
    // Juros = 2000 * 0.02 * 24 = 960
    const result = calculateSimpleInterest(2000, 2, 2, 'monthly', 'years');

    expect(result.totalInterest).toBe(960);
    expect(result.totalAmount).toBe(2960);
  });

  it('deve lidar com valores decimais corretamente', () => {
    // Cenário: R$ 1.500,50 a 1.5% ao mês por 3 meses
    // Juros = 1500.50 * 0.015 * 3 = 67.5225
    const result = calculateSimpleInterest(1500.50, 1.5, 3, 'monthly', 'months');

    // Usamos toBeCloseTo para comparar números flutuantes para evitar problemas de precisão binária
    expect(result.totalInterest).toBeCloseTo(67.5225, 4);
    expect(result.totalAmount).toBeCloseTo(1568.0225, 4);
  });

  it('deve retornar zero de juros se o capital for zero', () => {
    const result = calculateSimpleInterest(0, 10, 12, 'monthly', 'months');
    expect(result.totalInterest).toBe(0);
    expect(result.totalAmount).toBe(0);
  });
});