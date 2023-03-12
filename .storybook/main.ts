const path = require('path')
const tsconfigPaths = require('vite-tsconfig-paths').default
const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
    emotionAlias: false,
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    return {
      ...config,
      plugins: [...config.plugins, tsconfigPaths()],
      optimizeDeps: {
        ...config.optimizeDeps,
        entries: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
      },
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    }
  },
}
