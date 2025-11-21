import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso - Calculo.App.br",
  description: "Termos e condições de uso do Calculo.App.br",
};

export default function TermsPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm prose max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Termos de Uso</h1>

      <p className="text-gray-600 mb-4">
        Ao acessar o <strong>Calculo.App.br</strong>, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.
      </p>

      <h3>1. Isenção de Responsabilidade (Disclaimer)</h3>
      <p>
        Os materiais e ferramentas no site da Calculo.App.br são fornecidos "como estão".
        <strong>As simulações e cálculos realizados neste site têm caráter meramente informativo e educativo.</strong>
      </p>
      <p>
        Embora nos esforcemos para manter as informações e taxas atualizadas (como tabelas de INSS e IRRF), não garantimos a precisão absoluta, integridade ou atualidade dos resultados.
        Os resultados não substituem a consultoria profissional de um contador, advogado ou especialista financeiro.
        O Calculo.App.br não se responsabiliza por quaisquer danos ou perdas decorrentes do uso ou da incapacidade de usar os cálculos fornecidos.
      </p>

      <h3>2. Uso de Licença</h3>
      <p>
        É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Calculo.App.br, apenas para visualização transitória pessoal e não comercial.
      </p>

      <h3>3. Limitações</h3>
      <p>
        Em nenhum caso o Calculo.App.br ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Calculo.App.br.
      </p>

      <h3>4. Links</h3>
      <p>
        O Calculo.App.br não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Calculo.App.br do site. O uso de qualquer site vinculado é por conta e risco do usuário.
      </p>

      <h3>5. Modificações</h3>
      <p>
        O Calculo.App.br pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
      </p>
    </div>
  );
}
