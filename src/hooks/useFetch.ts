import useSWR from 'swr';
import { MutatorCallback } from 'swr/dist/types';

import { api } from '../services/api';

interface UseFetchResponse<Data, Error> {
  data?: Data;
  error?: Error;
  mutate: (
    data?: Data | Promise<Data> | MutatorCallback<Data> | undefined,
    shouldRevalidate?: boolean | undefined,
  ) => Promise<Data | undefined>;
}

export const useFetch = <Data = unknown, Error = unknown>(
  url: string,
): UseFetchResponse<Data, Error> => {
  const { data, error, mutate } = useSWR<Data, Error>(url, async route => {
    const response = await api.get<Data>(route);

    return response.data;
  });

  return { data, error, mutate };
};
