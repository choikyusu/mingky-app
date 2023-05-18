import { AxiosResponse } from 'axios';

interface Response<T> {
  data: T;
  count?: number;
  msg?: string;
}

type ApiResponse<T> = AxiosResponse<Response<T>>;
