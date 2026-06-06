import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // `globals: true` => describe/it/expect dispo sans import (au choix ; tu peux passer à false
    // et importer depuis 'vitest' si tu préfères des imports explicites).
    globals: true,
    include: ['tests/**/*.{test,spec}.ts', 'src/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      exclude: [
      'src/**/*.types.ts',          // types purs : rien à exécuter
      'src/domain/ports/**',        // interfaces : idem
      'src/ui/main.tsx',            // composition root : assemblage, testé manuellement
    ],
      // L'infrastructure (adapters réseau) sera couverte par des tests d'intégration séparés,
      // pas par la couverture unitaire du domaine.
    },
  },
})
