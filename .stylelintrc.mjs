export default {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-vue'],
  plugins: ['stylelint-selector-bem-pattern'],
  rules: {
    'plugin/selector-bem-pattern': { preset: 'bem' },
    'selector-class-pattern': null
  }
}
