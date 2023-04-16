module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    '@ronilaukkarinen/stylelint-a11y/recommended',
  ],
  ignoreFiles: ['**/public/**', '**/node_modules/**', '**/vite.config.ts', '**/vitest.setup.ts', '.storybook/**/*'],
  plugins: ['stylelint-prettier'],
  rules: {
    'max-nesting-depth': 2,
    'length-zero-no-unit': true,
  },
  overrides: [{
    files: ['src/**/*.{css,tsx}'],
    customSyntax: '@stylelint/postcss-css-in-js',
  }],
}
