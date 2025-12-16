import axios, { AxiosError, AxiosRequestConfig } from "axios"

export const AXIOS_INSTANCE = axios.create({
  baseURL: "https://public.api.paragraph.com/api",
})

let globalApiKey: string | undefined;

export const setApiKey = (apiKey: string | undefined) => {
  globalApiKey = apiKey;
}

export const customAxios = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()

  const headers = { ...config.headers };
  if (globalApiKey) {
    headers.Authorization = `Bearer ${globalApiKey}`;
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
