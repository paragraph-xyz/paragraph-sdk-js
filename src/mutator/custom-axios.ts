const BASE_URL = "https://public.api.paragraph.com/api";

export interface RequestConfig {
  url: string;
  method: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  baseURL?: string;
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

function toRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

function toStringHeaders(value: unknown): Record<string, string> {
  const record = toRecord(value);
  return Object.fromEntries(
    Object.entries(record).filter(([, headerValue]) => typeof headerValue === "string"),
  ) as Record<string, string>;
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

/**
 * Executes one generated API request.
 *
 * The optional request options are supplied by the owning ParagraphAPI instance.
 * Keeping credentials in this request-local object prevents concurrent clients
 * from overwriting one another's authentication state.
 */
export const customAxios = async <T>(
  config: RequestConfig,
  options?: unknown,
): Promise<T> => {
  const optionsRecord = toRecord(options);
  const requestConfig: RequestConfig = {
    ...config,
    baseURL:
      typeof optionsRecord.baseURL === "string"
        ? optionsRecord.baseURL
        : config.baseURL,
    headers: {
      ...(config.headers ?? {}),
      ...toStringHeaders(optionsRecord.headers),
    },
  };
  const headers: Record<string, string> = { ...(requestConfig.headers ?? {}) };

  const baseURL = (requestConfig.baseURL ?? BASE_URL).replace(/\/+$/, "");
  let url = `${baseURL}${requestConfig.url}`;
  if (requestConfig.params) {
    const qs = serializeParams(requestConfig.params);
    if (qs) url += (url.includes("?") ? "&" : "?") + qs;
  }

  let body: unknown = undefined;
  if (requestConfig.data !== undefined && requestConfig.data !== null) {
    if (isBinaryBody(requestConfig.data)) {
      body = requestConfig.data;
    } else {
      body = JSON.stringify(requestConfig.data);
      if (!headers["Content-Type"] && !headers["content-type"]) {
        headers["Content-Type"] = "application/json";
      }
    }
  }

  const response = await fetch(url, {
    method: requestConfig.method.toUpperCase(),
    headers,
    body: body as never,
    signal: requestConfig.signal,
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
