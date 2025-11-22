// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Aponta para a raiz do projeto Next.js para carregar variáveis .env, etc.
  dir: './',
})

// Configurações personalizadas do Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Permite usar o atalho '@/...' nos testes também
    '^@/(.*)$': '<rootDir>/$1',
  },
}

// createJestConfig é exportado dessa forma para garantir que o next/jest
// carregue a configuração do Next.js antes da nossa
module.exports = createJestConfig(customJestConfig)