import { defineConfig } from "orval"

export default defineConfig({
  paragraph: {
    input: {
      target: "./openapi.json",
    },
    output: {
      mode: "single",
      docs:false,
      //docs: { configPath: './typedoc.config.mjs' },
      target: "./src/generated/api.ts",
      schemas: "./src/generated/models",
      clean: true,
      client: "axios",
      mock: false,
      indexFiles: true,
      prettier: true,
      override: {
        mutator: {
          path: "./src/mutator/custom-axios.ts",
          name: "customAxios",
        },
      },
    },
  },
})
