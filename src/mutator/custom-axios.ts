import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export const AXIOS_INSTANCE = axios.create({
  baseURL: "https://public.api.paragraph.com/api",
})

export const customAxios = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}
