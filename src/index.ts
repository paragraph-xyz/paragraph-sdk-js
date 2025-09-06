// Main SDK entry point
// Generated files will be created by Orval

// Convenience wrapper class
export class ParagraphSDK {
  private apiKey?: string
  private baseURL: string

  constructor(config?: { apiKey?: string; baseURL?: string }) {
    this.apiKey = config?.apiKey
    this.baseURL = config?.baseURL || "https://api.paragraph.com/api"
  }

  // Add convenience methods that use the generated functions
  // This will be populated after Orval generates the client
}

// Re-export generated types when available
// Run 'yarn generate' to create these files
export * from "./generated/api"
export * from "./generated/models"
