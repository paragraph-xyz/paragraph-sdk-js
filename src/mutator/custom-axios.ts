import axios, { AxiosError, AxiosRequestConfig } from "axios"

export const AXIOS_INSTANCE = axios.create({
  baseURL: "https://public.api.paragraph.com/api",
})

// Instance-based API key storage using a context pattern
let currentApiKey: string | undefined;

/**
 * Sets the current API key context for the next API call.
 * This is used internally by ParagraphAPI to ensure instance isolation.
 * @internal
 */
export const setCurrentApiKey = (apiKey: string | undefined) => {
  currentApiKey = apiKey;
}

/**
 * Gets the current API key context.
 * @internal
 */
export const getCurrentApiKey = () => currentApiKey;

export const customAxios = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()

  const headers: Record<string, string> = { ...config.headers } as Record<string, string>;
  if (currentApiKey) {
    headers.Authorization = `Bearer ${currentApiKey}`;
  }

  const promise = AXIOS_INSTANCE({
    ...config,
    headers,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}

export type ErrorType<Error> = AxiosError<Error>;
