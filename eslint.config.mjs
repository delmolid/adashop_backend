// eslint.config.mjs

// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tsParser from '@typescript-eslint/parser';
import tsPlugin, {
  configs as tsConfigs,
} from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
        ecmaVersion: 2020,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsConfigs.recommendedTypeChecked.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
];
