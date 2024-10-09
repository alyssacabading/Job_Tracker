import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    'rules': {
      'quotes': ['error', 'single'], 
      'semi': ['error', 'always'],     
      'no-unused-vars': ['warn'],     
      "max-len": ["error", { "code": 80 }], 
      "indent": ["error", 2], 
      "comma-dangle": ["error", "always-multiline"], 
    }, 
    ignores: ['node_modules/', 'dist/'],
  },
];
