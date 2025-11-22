// CAMINHO: components/__tests__/SimpleInterestCalculator.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SimpleInterestCalculator from '../SimpleInterestCalculator';

// Mock básico para window.alert já que ele não existe no ambiente de teste JSDOM
window.alert = jest.fn();

describe('SimpleInterestCalculator (Componente)', () => {
  
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário corretamente', () => {
    render(<SimpleInterestCalculator />);

    // Verifica se os campos principais estão na tela
    expect(screen.getByLabelText(/Valor Principal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Taxa de Juros/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Período/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calcular Juros/i })).toBeInTheDocument();
    
    // Garante que a área de resultado NÃO está na tela inicialmente
    expect(screen.queryByText(/Resultado da Simulação/i)).not.toBeInTheDocument();
  });

  it('deve exibir um alerta se tentar calcular com valores não numéricos (ex: texto)', async () => {
    render(<SimpleInterestCalculator />);
    const user = userEvent.setup();

    // 1. Preencher o primeiro campo com texto inválido (vai falhar no isNaN do JS)
    const principalInput = screen.getByLabelText(/Valor Principal/i);
    await user.type(principalInput, 'abc');

    // --- CORREÇÃO IMPORTANTE AQUI ---
    // 2. Precisamos preencher também os outros campos que têm 'required',
    // caso contrário a validação nativa do HTML5 bloqueia o envio antes do JS rodar.
    // Podemos colocar valores válidos neles, o 'abc' acima já vai garantir o erro no JS.
    const rateInput = screen.getByLabelText(/Taxa de Juros/i);
    await user.type(rateInput, '10');

    const timeInput = screen.getByLabelText(/Período/i);
    await user.type(timeInput, '12');
    // -------------------------------

    // 3. Clicar no botão calcular
    const calculateButton = screen.getByRole('button', { name: /Calcular Juros/i });
    await user.click(calculateButton);

    // 4. Agora sim: o HTML5 deixou passar, mas o JS detectou o 'abc' e chamou o alert.
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('preencha os campos com valores numéricos'));
    
    // Verifica se o resultado continua escondido
    expect(screen.queryByText(/Resultado da Simulação/i)).not.toBeInTheDocument();
  });

  it('deve calcular e exibir os resultados corretamente quando o formulário é preenchido (Caminho Feliz)', async () => {
    render(<SimpleInterestCalculator />);
    const user = userEvent.setup();

    // 1. Preencher o formulário
    // Simulando: R$ 1.000,00, taxa de 1% ao mês, por 12 meses
    const principalInput = screen.getByLabelText(/Valor Principal/i);
    await user.type(principalInput, '1.000,00');

    const rateInput = screen.getByLabelText(/Taxa de Juros/i);
    await user.type(rateInput, '1');
    
    // (Os selects já vêm com "ao mês" e "meses" por padrão, então não precisamos mudar neste teste)
    const timeInput = screen.getByLabelText(/Período/i);
    await user.type(timeInput, '12');

    // 2. Clicar no botão calcular
    const calculateButton = screen.getByRole('button', { name: /Calcular Juros/i });
    await user.click(calculateButton);

    // 3. Verificar os resultados na tela
    // Esperamos que a área de resultado apareça
    expect(screen.getByText(/Resultado da Simulação/i)).toBeInTheDocument();

    // Verificando os valores formatados (pode precisar de ajuste fino dependendo de como o Intl roda no ambiente de teste, mas geralmente funciona)
    // R$ 1.000,00 investido
    expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument();
    // +R$ 120,00 de juros
    expect(screen.getByText('+R$ 120,00')).toBeInTheDocument();
    // R$ 1.120,00 total
    expect(screen.getByText('R$ 1.120,00')).toBeInTheDocument();
  });

  it('deve lidar com a mudança dos seletores de período (anos)', async () => {
    render(<SimpleInterestCalculator />);
    const user = userEvent.setup();

    // Simulando: R$ 1000, 12% ao ANO, por 1 ANO
    await user.type(screen.getByLabelText(/Valor Principal/i), '1000');
    await user.type(screen.getByLabelText(/Taxa de Juros/i), '12');
    await user.type(screen.getByLabelText(/Período/i), '1');

    // Mudando os selects para "ano"
    // Nota: para selects, usamos o display value ou pegamos pelo role
    const rateSelect = screen.getAllByRole('combobox')[0]; // O primeiro select é o da taxa
    const timeSelect = screen.getAllByRole('combobox')[1]; // O segundo é o do tempo

    await user.selectOptions(rateSelect, 'yearly'); // % ao ano
    await user.selectOptions(timeSelect, 'years');   // Anos

    await user.click(screen.getByRole('button', { name: /Calcular Juros/i }));

    // Resultado esperado: Juros de R$ 120,00
    expect(screen.getByText('+R$ 120,00')).toBeInTheDocument();
  });
});