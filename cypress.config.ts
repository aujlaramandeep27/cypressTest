// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    EDITOR: 'code --wait' // Use 'code' for VSCode
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://app.qa.nesto.ca',
    supportFile: false,
    experimentalRunAllSpecs: true,
  },
});
