# Cálculo.App - Manual de Desenvolvimento

Este documento serve como o guia oficial de arquitetura, padrões e fluxo de trabalho para o desenvolvimento do projeto **Cálculo.App**.

O objetivo deste manual é garantir consistência, manutenibilidade e conformidade com as regras de negócio e SEO em todas as futuras implementações.

---

## 🛠 Stack Tecnológica

-   **Framework Principal:** Next.js 14 (App Router)
-   **Linguagem:** TypeScript
-   **Estilização:** Tailwind CSS
-   **Testes:** Jest + React Testing Library
-   **Monetization:** Google AdSense
-   **Deployment:** Vercel (Recomendado)

---

## 📂 Estrutura de Pastas Essencial

Entender onde cada coisa vive é crucial neste projeto.

├── app/ # (Next.js App Router) Páginas e Rotas 
│ 
├── (datas)/ # Grupo de rotas para calculadoras de Datas 
│ 
├── (financeira)/ # Grupo de rotas para calculadoras Financeiras 
│ 
├── (trabalhista)/ # Grupo de rotas para calculadoras Trabalhistas 
│ 
├── layout.tsx # Layout principal (Header, Footer, Sidebar, Scripts Globais) 
│ 
└── globals.css # Estilos globais e resets (Correções de modo escuro aqui) 
│ 
├── components/ # Componentes React Reutilizáveis 
│ 
├── tests/ # Testes de integração dos componentes 
│ 
├── Header.tsx, Footer.tsx # Componentes estruturais 
│ 
├── AdSense.tsx # Componente isolado de anúncio 
│ 
└── [Nome]Calculator.tsx # Componentes interativos das calculadoras (Client Components) 
│ 
├── lib/ # Lógica de Negócio Pura (Sem React) 
│ 
├── tests/ # Testes unitários da lógica matemática 
│ 
├── date-calculations.ts # Funções auxiliares de datas 
│ 
├── labor-calculations.ts # Funções de cálculos trabalhistas 
│ 
└── tax-tables.ts # Dados estáticos oficiais (INSS, IRRF) - Fonte da verdade. 
│ 
├── public/ # Ativos estáticos (imagens, favicon, robots.txt) 
└── ...arquivos de config (tailwind, tsconfig, jest, etc.)

---

## 🚀 Fluxo de Criação de Nova Calculadora

Sempre que for adicionar uma nova ferramenta, siga rigorosamente este fluxo de 3 passos para manter a arquitetura limpa.

### PASSO 1: A Lógica Pura (`/lib`)

**Nunca** misture lógica matemática complexa com componentes de interface.

1.  Identifique o arquivo correto em `/lib` (ex: financeiro, trabalhista) ou crie um novo se for um novo domínio.
2.  Crie as **Interfaces TypeScript** para os dados de entrada e o objeto de resultado.
3.  Escreva a função de cálculo como uma função pura (recebe dados -> retorna dados, sem efeitos colaterais).
4.  **Obrigatório:** Crie o teste unitário correspondente em `lib/__tests__/` para validar a matemática.

### PASSO 2: O Componente Visual (`/components`)

Este é o "Client Component" que gerencia o estado do formulário e a interação do usuário.

1.  Crie o arquivo `[Nome]Calculator.tsx` em `/components`.
2.  Use `"use client";` no topo.
3.  Importe a função de cálculo e as interfaces criadas no PASSO 1.
4.  **Padrão de Inputs (Crucial para Mobile/iOS/Dark Mode):**
    * Todos os inputs e selects **DEVEM** ter as classes: `bg-white text-gray-900 text-base md:text-sm`.
    * Isso evita zoom indesejado no iPhone e garante legibilidade se o dispositivo do usuário estiver em modo escuro.
5.  Implemente a validação básica no `handleSubmit` antes de chamar a função da `lib`.
6.  **Recomendado:** Crie um teste de componente em `components/__tests__/` para verificar se o formulário renderiza e submete corretamente.

### PASSO 3: A Página (`/app`)

Este é o "Server Component" focado em SEO e estrutura.

1.  Escolha o "Route Group" correto em `/app` (ex: `(financeira)`). Crie a pasta da nova rota.
2.  Crie o arquivo `page.tsx`. **NÃO** use `"use client";` aqui.
3.  Exporte o objeto `metadata` para SEO (Título e Descrição).
4.  Escreva conteúdo rico (texto, H2, listas) explicando o que é a calculadora. O Google precisa disso.
5.  Importe e insira o componente criado no PASSO 2.
6.  Importe e insira componentes `<AdSense slot="..." />` estrategicamente (topo e meio do conteúdo).

---

## 🎨 Padrões de Estilo e UI

-   **Tailwind First:** Evite CSS personalizado. Use as classes utilitárias.
-   **Cores:**
    -   Ação/Destaque: `blue-600` (botões, links, totais).
    -   Texto Padrão: `gray-700` ou `gray-900` para títulos.
    -   Fundo: `gray-50` (página), `white` (cards).
-   **Responsividade (Mobile-First):**
    -   Desenvolva pensando na tela pequena primeiro.
    -   Use prefixos `md:` ou `lg:` para ajustar layouts para telas maiores.
    -   *Exemplo:* `p-4 md:p-6` (padding menor no celular, maior no desktop).

---

## 💰 Monetização (AdSense)

-   Use sempre o componente `@/components/AdSense`.
-   **Em desenvolvimento:** Use qualquer string como `slot` (ex: "teste"). Um placeholder cinza aparecerá.
-   **Em produção:** Crie um bloco de anúncio real no painel do Google AdSense e use o **ID numérico** real na propriedade `slot`.
-   **Posicionamento:**
    -   Topo das páginas (antes do primeiro parágrafo).
    -   Meio de textos longos.
    -   Sidebar do layout principal (bloco vertical).

---

## 🧪 Testes

Manter os testes passando é obrigatório antes de qualquer deploy.

-   **Rodar todos os testes:** `npm test`
-   **Rodar em modo assistido:** `npm run test:watch` (útil durante o desenvolvimento).