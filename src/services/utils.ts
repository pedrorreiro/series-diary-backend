import { BusinessError } from '@/errors/BusinessError';
import { Either, right, wrong } from '@/errors/either';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { config } from 'config';

type ApiResponse<SuccessResponse> = Promise<Either<Error, SuccessResponse>>;

export async function handleAxiosResponse<SuccessResponse>(
  request: Promise<AxiosResponse>,
): ApiResponse<SuccessResponse> {
  try {
    const response = await request;

    return right(response.data as SuccessResponse);
  } catch (error) {
    const axiosError = error as AxiosError<BusinessError>;
    return wrong(axiosError);
  }
}
export async function setRequestInterceptors(client: AxiosInstance) {
  client.interceptors.request.use(
    (requestConfig) => {
      if (requestConfig.url && typeof requestConfig.url === 'string') {
        requestConfig.url = `${config.tmdb.baseUrl}${requestConfig.url.replace(/\/+$/, '')}`; // Remove barras no final da URL
      }

      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${config.tmdb.token}`,
      } as unknown as AxiosRequestHeaders;

      return requestConfig;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );

  return client;
}
