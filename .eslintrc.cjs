/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-standard-with-typescript',
    '@vue/eslint-config-prettier'
  ],
  ignorePatterns: ['components.d.ts'],
  rules: {
    'no-return-await': 'error',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    // Мои настройки:
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowedNames: ['use'] }
    ]
  },
  overrides: [
    {
      files: ['cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ]
}
