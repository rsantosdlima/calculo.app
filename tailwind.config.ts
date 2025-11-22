import type { Config } from "tailwindcss";

const config: Config = {
  // ESTA LINHA É CRUCIAL: Diz ao Tailwind para só ativar modo escuro
  // se nós adicionarmos manualmente uma classe 'dark' no HTML (o que não faremos).
  darkMode: 'class',

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        // Se houver outras configurações de cores aqui, mantenha.
    },
  },
  plugins: [],
};
export default config;