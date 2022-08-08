import { StorybookViteConfig } from '@storybook/builder-vite'
import { mergeConfig } from 'vite'
import viteConfig from '../vite.config'

const config: StorybookViteConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config, options) {
    return mergeConfig(config, {
      root: viteConfig.root,
      resolve: viteConfig.resolve,
    })
  },
}

module.exports = config
