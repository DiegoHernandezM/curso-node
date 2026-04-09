import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: "jest-environment-node",

  // dónde están tus tests
  testMatch: ['**/tests/**/*.test.ts'],

  // opcional pero útil
  moduleFileExtensions: ['ts', 'js'],

  // para evitar problemas con rutas
  roots: ['<rootDir>'],

  clearMocks: true,
};

export default config;