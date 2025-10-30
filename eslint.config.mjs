// ESLint v9 Flat Config for phpMyFAQ website
import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

export default [
  // Ignore patterns (Flat Config ersetzt .eslintignore)
  {
    ignores: [
      '.next/**',
      'out/**',
      'coverage/**',
      'playwright-report/**',
      'node_modules/**',
      'dist/**',
      'next-env.d.ts',
    ],
  },

  // JavaScript/TypeScript Standardempfehlungen
  js.configs.recommended,

  // Next.js Core Web Vitals Regeln (teilweise entschärft für Migration)
  {
    name: 'next/core-web-vitals',
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-html-link-for-pages': 'off',
    },
  },

  // TypeScript Setup + empfohlene Regeln
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // TS übernimmt Undef-Prüfung
      'no-undef': 'off',
      // Migrationserleichterung
      'no-useless-escape': 'warn',
      // Verbot von triple-slash references (außer next-env.d.ts, die ignoriert wird)
      '@typescript-eslint/triple-slash-reference': ['error', { types: 'never', lib: 'never', path: 'never' }],
      // Häufige kleine Verstöße sanfter behandeln
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true, caughtErrors: 'none' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // Tests: Vitest-Globals aktivieren
  {
    files: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Node/Config-Dateien (optional)
  {
    files: ['*.config.*', 'scripts/**/*.{ts,js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
]
