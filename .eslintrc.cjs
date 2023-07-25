module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'plugin:storybook/recommended'],
  ignorePatterns: [
    'node_modules/*',
    '.eslintrc.*',
    'vite.config.*',
    '/src/vite-env.d.ts',
    '.storybook/**/*',
    '/src/apis/bin/*',
    '/src/apis/spec/*',
    '/src/resources/*',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', 'react-hooks', 'jest-dom', 'testing-library'],
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
      ],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@/features/*/*'],
          },
        ],
        'linebreak-style': ['error', 'unix'],
        'react/prop-types': 'off',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/media-has-caption': 'off',
        'testing-library/no-debugging-utils': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-floating-promises': ['off', { ignoreVoid: true }],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/strict-boolean-expressions': ['off'],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        'prettier/prettier': [
          'error',
          {},
          {
            usePrettierrc: true,
          },
        ],
        'import/no-unresolved': 'off',
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksConditionals: false,
          },
        ],
      },
    },
  ],
}
