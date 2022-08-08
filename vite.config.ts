import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import * as path from 'path'
import { resolve } from 'path'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dfxJson from './dfx.json'
import * as fs from 'fs'
import { UserConfig } from 'vite'

type Network = 'staging' | 'ic' | 'production' | 'local'
const networkName = process.env['DFX_NETWORK'] || 'local'

interface CanisterIds {
  [key: string]: { [key in Network]: string }
}

const DFX_HOST = process.env?.DFX_HOST ?? dfxJson.networks.local.bind.split(':')[0]
const DFX_PORT = process.env?.DFX_PORT ?? dfxJson.networks.local.bind.split(':')[1]
const DFX_PROTOCOL = process.env?.DFX_PROTOCOL ?? 'http'

// eslint-disable-next-line no-console
console.log('⚠️', 'Network settings of the replica', {
  DFX_HOST,
  DFX_PORT,
  DFX_PROTOCOL,
})

let canisterIds: CanisterIds = {}

// @todo the whole process needs to be rethought
try {
  const canister_ids_json_path =
    networkName !== 'local' && fs.readFileSync('./canister_ids.json')
      ? './canister_ids.json'
      : `.dfx/${networkName}/canister_ids.json`

  canisterIds = JSON.parse(fs.readFileSync(canister_ids_json_path).toString())
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('\n⚠️  Before starting the dev server run: dfx deploy\n\n')
}

// List of all canisterAliases for canisters
// This will allow us to: import { canisterName } from "canisters/canisterName"
const canisterAliases = Object.entries(dfxJson.canisters).reduce(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (acc, [name, _value]) => {
    // Get the network name, or `local` by default.
    const outputRoot = path.join(__dirname, 'src', 'declarations', name)

    return {
      ...acc,
      ['canisters/' + name]: path.join(outputRoot, 'index' + '.js'),
    }
  },
  {},
)

// Generate canister ids, required by the generated canister code in .dfx/local/canisters/*
// This strange way of JSON.stringifying the value is required by vite
const canisterDefinitions = Object.entries(canisterIds).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [`process.env.${key.toUpperCase()}_CANISTER_ID`]: JSON.stringify(val[networkName]),
    [`import.meta.env.VITE_${key.toUpperCase()}_CANISTER_ID`]: JSON.stringify(
      val[networkName],
    ),
  }),
  {},
)

// eslint-disable-next-line no-console
console.log('🚀', canisterDefinitions, canisterAliases)

export const frontendAliases = {
  ...canisterAliases,
  '~': `${resolve(__dirname, 'src/frontend')}/`,
  '@': `${resolve(__dirname, 'src/frontend')}/`,
}

// See guide on how to configure Vite at:
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: resolve(__dirname, 'src/frontend'),
  resolve: {
    alias: {
      // Here we tell Vite the "fake" modules that we want to define
      ...frontendAliases,
    },
  },
  build: {
    outDir: '../../dist',
    target: ['es2020'], // @warn we have to clarify whether that affects our audience
  },
  server: {
    fs: {
      allow: ['.'],
    },
    port: 3000,
    proxy: {
      // This proxies all http requests made to /api to our running dfx instance
      '/api': {
        target: `${DFX_PROTOCOL}://${DFX_HOST}:${DFX_PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  define: {
    // Here we can define global constants
    // This is required for now because the code generated by dfx relies on process.env being set
    ...canisterDefinitions,
    'process.env.NODE_ENV': JSON.stringify(
      networkName === 'local' ? 'development' : 'production',
    ),
    'import.meta.vitest': 'undefined',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    includeSource: ['**/*.{js,ts,vue}'],
  },
}) as UserConfig
