import { defineConfig } from 'cypress'

const cypressHostPort = parseInt(process?.env?.CYPRESS_HOST_PORT ?? '8082')
const cypressBaseUrl = process?.env?.CYPRESS_BASE_URL ?? 'http://localhost:3000'

export default defineConfig({
  video: false,
  port: cypressHostPort,
  e2e: {
    specPattern: 'e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    baseUrl: cypressBaseUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
