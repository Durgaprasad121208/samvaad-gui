import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiRequestOptions extends AxiosRequestConfig {
  url: string;
  service?: boolean;
}

const request = async function <T = unknown>(
  options: ApiRequestOptions
): Promise<T> {
  const client = axios.create({
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const onSuccess = function (response: AxiosResponse<T>): T {
    return response?.data;
  };

  const handleStatusCode = function (statusCode: number) {
    switch (statusCode) {
      case 200:
      case 201:
        break;
      case 400:
        console.warn('statusCode: 400 - Bad Request');
        break;
      case 401:
        console.warn('statusCode: 401 - Unauthorized');
        break;
      case 403:
        console.warn('statusCode: 403 - Forbidden');
        break;
      case 404:
        console.warn('statusCode: 404 - Resource not found');
        break;
      case 500:
        console.error('statusCode: 500 - Internal Server Error');
        break;
      default:
        console.log('statusCode:', statusCode);
    }
  };

  const onError = function (error: unknown) {
    const axiosError = error as {
      response?: { status: number; data?: unknown };
      message?: string;
    };
    if (axiosError?.response) {
      handleStatusCode(axiosError.response.status);
    } else {
      console.error('error message:', axiosError?.message);
    }
    return Promise.reject(axiosError?.response?.data || axiosError?.response || error);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

/**
 * InventX style POST API Request
 */
export const PostAPIRequest = <T = unknown>(options: ApiRequestOptions): Promise<T> => {
  const { url, ...otherOptions } = options;

  return request<T>({
    ...otherOptions,
    url,
    method: 'POST',
    withCredentials: false,
    data: options.data,
    headers: {
      ...(otherOptions.headers || {}),
    },
  });
};

export default request;
