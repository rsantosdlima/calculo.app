import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade - Calculo.App.br",
  description: "Política de privacidade e coleta de dados do Calculo.App.br",
};

export default function PrivacyPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm prose max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidade</h1>

      <p className="text-gray-600 mb-4">
        Última atualização: {new Date().toLocaleDateString()}
      </p>

      <h3>1. Introdução</h3>
      <p>
        O <strong>Calculo.App.br</strong> compromete-se com a segurança e privacidade dos dados de seus usuários.
        Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais ao utilizar nosso site e ferramentas.
      </p>

      <h3>2. Coleta de Dados</h3>
      <p>
        Coletamos informações de duas formas principais:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Dados fornecidos voluntariamente:</strong> Informações inseridas nos formulários de contato (como nome e e-mail) ou nas calculadoras. Note que os dados inseridos nas calculadoras são processados localmente ou de forma anônima e não são armazenados permanentemente em nossos servidores vinculados à sua identidade.</li>
        <li><strong>Dados de navegação (Cookies):</strong> Utilizamos cookies e tecnologias similares para coletar dados sobre como você interage com nosso site, como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência.</li>
      </ul>

      <h3>3. Uso das Informações</h3>
      <p>Utilizamos seus dados para:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>Fornecer e melhorar nossas ferramentas de cálculo.</li>
        <li>Exibir publicidade personalizada através do <strong>Google AdSense</strong>.</li>
        <li>Analisar o tráfego e comportamento dos usuários para otimizar o site.</li>
        <li>Responder a solicitações enviadas pelo formulário de contato.</li>
      </ul>

      <h3>4. Publicidade e Cookies (Google AdSense)</h3>
      <p>
        O Calculo.App.br utiliza o Google AdSense para exibir anúncios. O Google e seus parceiros utilizam cookies para veicular anúncios com base em suas visitas anteriores ao nosso site ou a outros sites na Internet.
      </p>
      <p>
        Os usuários podem optar por não receber publicidade personalizada acessando as <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Configurações de Anúncios</a>.
      </p>

      <h3>5. Compartilhamento de Dados</h3>
      <p>
        Não vendemos ou comercializamos suas informações pessoais identificáveis. Podemos compartilhar dados agregados e não identificáveis com parceiros de análise e publicidade.
      </p>

      <h3>6. Seus Direitos (LGPD)</h3>
      <p>
        Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a acessar, corrigir ou solicitar a exclusão de seus dados pessoais. Para exercer esses direitos, entre em contato conosco através da página de Contato.
      </p>

      <h3>7. Alterações nesta Política</h3>
      <p>
        Podemos atualizar esta política periodicamente. Recomendamos que revise esta página regularmente para estar ciente de quaisquer alterações.
      </p>
    </div>
  );
}
