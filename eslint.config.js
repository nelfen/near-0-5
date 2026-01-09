import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      import: importPlugin,
      react,
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // React.FC 금지 (간접적으로 강제)
      '@typescript-eslint/no-empty-interface': 'error',

      /* =========================
         TypeScript
      ========================= */
      '@typescript-eslint/no-explicit-any': 'error',
      'arrow-body-style': ['error', 'as-needed'],

      // 한 줄 if라도 블록 필수
      curly: ['error', 'all'],

      /* =========================
         함수 / 코드 스타일
      ========================= */
      'prefer-arrow-callback': 'error',

      'react-hooks/exhaustive-deps': 'warn',
      /* =========================
         Hooks
      ========================= */
      'react-hooks/rules-of-hooks': 'error',

      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/prop-types': 'off',

      /* =========================
         React
      ========================= */
      'react/react-in-jsx-scope': 'off',

      /* =========================
         unused / import
      ========================= */
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Prettier와 충돌 방지
  perfectionist.configs['recommended-natural'],
  eslintConfigPrettier,
];
