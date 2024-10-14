import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    EDITOR: 'code --wait' // Use 'code' for VSCode
  },
  e2e: {
    baseUrl: 'https://app.qa.nesto.ca',
    supportFile: false,
    experimentalRunAllSpecs: true,
  },
});
