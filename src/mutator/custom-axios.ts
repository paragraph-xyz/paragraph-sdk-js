const BASE_URL = "https://public.api.paragraph.com/api";

// Instance-based API key storage using a context pattern
let currentApiKey: string | undefined;

/**
 * Sets the current API key context for the next API call.
 * This is used internally by ParagraphAPI to ensure instance isolation.
 * @internal
 */
export const setCurrentApiKey = (apiKey: string | undefined) => {
  currentApiKey = apiKey;
};

/**
 * Gets the current API key context.
 * @internal
 */
export const getCurrentApiKey = () => currentApiKey;

export interface RequestConfig {
  url: string;
  method: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export class ParagraphApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly data: unknown,
  ) {
    super(`Request failed with status ${status}`);
    this.name = "ParagraphApiError";
  }
}

export type ErrorType<_E> = ParagraphApiError;

function serializeParams(params: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    const encodedKey = encodeURIComponent(key);
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === undefined || item === null) continue;
        parts.push(`${encodedKey}[]=${encodeURIComponent(String(item))}`);
      }
    } else if (value instanceof Date) {
      parts.push(`${encodedKey}=${encodeURIComponent(value.toISOString())}`);
    } else if (typeof value === "object") {
      parts.push(`${encodedKey}=${encodeURIComponent(JSON.stringify(value))}`);
    } else {
      parts.push(`${encodedKey}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts.join("&");
}

function isBinaryBody(data: unknown): boolean {
  return (
    typeof data === "string" ||
    data instanceof ArrayBuffer ||
    (typeof Blob !== "undefined" && data instanceof Blob) ||
    (typeof FormData !== "undefined" && data instanceof FormData) ||
    (typeof URLSearchParams !== "undefined" && data instanceof URLSearchParams) ||
    (typeof ReadableStream !== "undefined" && data instanceof ReadableStream)
  );
}

export const customAxios = async <T>(config: RequestConfig): Promise<T> => {
  const headers: Record<string, string> = { ...(config.headers ?? {}) };
  if (currentApiKey) {
    headers.Authorization = `Bearer ${currentApiKey}`;
  }

  let url = `${BASE_URL}${config.url}`;
  if (config.params) {
    const qs = serializeParams(config.params);
    if (qs) url += (url.includes("?") ? "&" : "?") + qs;
  }

  let body: unknown = undefined;
  if (config.data !== undefined && config.data !== null) {
    if (isBinaryBody(config.data)) {
      body = config.data;
    } else {
      body = JSON.stringify(config.data);
      if (!headers["Content-Type"] && !headers["content-type"]) {
        headers["Content-Type"] = "application/json";
      }
    }
  }

  const response = await fetch(url, {
    method: config.method.toUpperCase(),
    headers,
    body: body as never,
    signal: config.signal,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const hasBody = response.status !== 204 && response.status !== 205;
  let payload: unknown = undefined;
  if (hasBody) {
    payload = contentType.includes("application/json")
      ? await response.json().catch(() => undefined)
      : await response.text().catch(() => undefined);
  }

  if (!response.ok) {
    throw new ParagraphApiError(response.status, response.statusText, payload);
  }

  return payload as T;
};
