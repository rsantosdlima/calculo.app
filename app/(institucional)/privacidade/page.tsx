// CAMINHO: app/termos/page.tsx

import type { Metadata } from "next";
import AdSense from "@/components/AdSense";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso | Cálculo.App",
  description:
    "Leia os termos e condições para uso das calculadoras e simuladores do Cálculo.App. Informações importantes sobre a isenção de responsabilidade.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Termos de Uso
      </h1>
      <p className="text-gray-500 mb-8">Última atualização: {currentDate}</p>

      {/* AdSense Topo */}
      <AdSense slot="2405902567" className="my-8" format="auto" />

      <div className="prose lg:prose-lg text-gray-700">
        <p>
          Bem-vindo ao <strong>Cálculo.App</strong>. Ao acessar e utilizar nosso
          site e nossas ferramentas, você concorda em cumprir e estar vinculado
          aos seguintes termos e condições de uso. Se você não concordar com
          alguma parte destes termos, por favor, não utilize nossos serviços.
        </p>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8 not-prose rounded-r-lg">
          <h2 className="text-xl font-bold text-red-800 mb-4 uppercase">
            1. Isenção de Responsabilidade (Importante)
          </h2>
          <p className="text-gray-800 mb-4 font-medium">
            O Cálculo.App é uma ferramenta educativa e de simulação. Os
            resultados fornecidos por nossas calculadoras são{" "}
            <strong>estimativas</strong> baseadas nas informações que você
            insere e na legislação vigente conhecida no momento.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li>
              <strong>Não substituem aconselhamento profissional:</strong> Nossos
              cálculos NÃO substituem a consulta a um contador, advogado
              trabalhista, especialista financeiro ou aos órgãos oficiais (como
              Receita Federal ou Ministério do Trabalho).
            </li>
            <li>
              <strong>Sem garantia de exatidão:</strong> Embora nos esforcemos
              para manter as tabelas e alíquotas atualizadas (como INSS e
              IRRF), a legislação pode mudar a qualquer momento, e casos
              específicos podem ter regras não cobertas pelas nossas
              calculadoras genéricas.
            </li>
            <li>
              <strong>Uso por sua conta e risco:</strong> O Cálculo.App e seus
              desenvolvedores NÃO se responsabilizam por quaisquer perdas,
              danos ou decisões financeiras/trabalhistas tomadas com base nos
              resultados das simulações aqui apresentadas.
            </li>
          </ul>
        </div>

        <h2>2. Uso Permitido</h2>
        <p>Você concorda em usar o site apenas para fins legais e pessoais:</p>
        <ul>
          <li>
            Você pode realizar simulações ilimitadas para seu uso pessoal ou
            profissional (ex: um contador fazendo uma pré-análise).
          </li>
          <li>
            Você não deve tentar acessar áreas restritas do site, interferir no
            seu funcionamento, ou usar métodos automatizados (bots, scrapers)
            para coletar dados sem permissão.
          </li>
        </ul>

        <h2>3. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo presente neste site, incluindo textos, a lógica das
          calculadoras, design, logotipos e código-fonte, é propriedade do
          Cálculo.App e está protegido pelas leis de direitos autorais e
          propriedade intelectual. É proibida a reprodução, cópia ou
          redistribuição do nosso conteúdo para fins comerciais sem autorização
          expressa.
        </p>

        <h2>4. Links para Terceiros e Publicidade</h2>
        <p>
          Nosso site exibe anúncios fornecidos por terceiros (Google AdSense).
          Não temos controle sobre o conteúdo desses anúncios ou sobre os sites
          para os quais eles redirecionam. A interação com esses anúncios é de
          sua responsabilidade e está sujeita aos termos de uso e políticas de
          privacidade desses terceiros. Leia nossa{" "}
          <Link href="/privacidade" className="text-blue-600 hover:underline">
            Política de Privacidade
          </Link>{" "}
          para mais detalhes sobre como os anúncios funcionam.
        </p>

        <h2>5. Modificações nos Termos</h2>
        <p>
          Reservamo-nos o direito de alterar estes Termos de Uso a qualquer
          momento, sem aviso prévio. O uso contínuo do site após quaisquer
          alterações constitui sua aceitação dos novos termos.
        </p>

        <h2>6. Lei Aplicável</h2>
        <p>
          Estes termos são regidos e interpretados de acordo com as leis da
          República Federativa do Brasil. Qualquer disputa relacionada a estes
          termos será submetida à jurisdição exclusiva dos tribunais
          brasileiros.
        </p>

        <p className="mt-12 pt-8 border-t border-gray-200">
          <strong>Contato:</strong> Se tiver dúvidas sobre estes Termos de Uso,
          entre em contato pelo e-mail{" "}
          <a
            href="mailto:contato@calculo.app.br"
            className="text-blue-600 hover:underline"
          >
            contato@calculo.app.br
          </a>
          .
        </p>
      </div>

      {/* AdSense Rodapé */}
      <AdSense slot="2405902567" className="my-12" format="auto" />
    </main>
  );
}