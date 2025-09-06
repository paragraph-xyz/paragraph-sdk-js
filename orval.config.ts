import { defineConfig } from "orval"

export default defineConfig({
  paragraph: {
    input: {
      target: "./openapi.json",
    },
    output: {
      mode: "split",
      target: "./src/generated/api.ts",
      schemas: "./src/generated/models",
      client: "axios",
      mock: false,
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
