import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import tailwindcss from 'eslint-plugin-tailwindcss';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'unused-imports': unusedImports,
      tailwindcss,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      /* =========================
         TypeScript
      ========================= */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      /* =========================
         React
      ========================= */
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // React.FC 금지 (간접적으로 강제)
      '@typescript-eslint/no-empty-interface': 'error',

      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      /* =========================
         Hooks
      ========================= */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* =========================
         함수 / 코드 스타일
      ========================= */
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],

      // 한 줄 if라도 블록 필수
      curly: ['error', 'all'],

      /* =========================
         unused / import
      ========================= */
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      /* =========================
         Tailwind
      ========================= */
      'tailwindcss/no-custom-classname': 'off',
    },
  },

  // Prettier와 충돌 방지
  prettier,
];
