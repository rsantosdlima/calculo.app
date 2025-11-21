import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós - Calculo.App",
  description: "Conheça a história e a missão do Calculo.App",
};

export default function AboutPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm prose max-w-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Sobre Nós</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          O <strong>Calculo.App</strong> nasceu de uma inquietação simples, mas poderosa: por que calcular coisas do dia a dia precisa ser tão complicado?
        </p>

        <p>
          Todos nós já passamos por aquele momento de dúvida ao olhar para um contracheque, tentar entender os juros de um financiamento ou simplesmente planejar as contas do mês.
          Fórmulas complexas, tabelas desatualizadas e planilhas confusas muitas vezes afastam as pessoas do controle de sua própria vida financeira e trabalhista.
        </p>

        <p>
          Foi pensando nisso que criamos este espaço. Nosso objetivo não é apenas fornecer números, mas sim <strong>clareza</strong>.
          Queremos democratizar o acesso à informação precisa, permitindo que qualquer pessoa — independentemente de sua afinidade com a matemática — consiga obter respostas rápidas e confiáveis.
        </p>

        <p>
          Nossa missão é facilitar o seu dia a dia. Seja para conferir se o desconto do INSS está correto, simular um investimento ou planejar suas férias, estamos aqui para fazer a "parte chata" dos cálculos para você.
        </p>

        <p>
          Acreditamos que, com as ferramentas certas, todos podem tomar decisões melhores e mais conscientes. Bem-vindo ao Calculo.App: a matemática a seu favor, de forma simples.
        </p>
      </div>
    </div>
  );
}
