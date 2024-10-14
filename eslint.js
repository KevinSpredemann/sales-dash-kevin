const js = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const eslintPluginReactHooks = require('eslint-plugin-react-hooks')
const reactHooks = eslintPluginReactHooks

const globals = { browser: true }

module.exports = {
  ignores: ['dist'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier',
        'plugin:cypress/recommended',
      ],
      rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
      },
    },
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals,
  },
}
