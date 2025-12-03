import axios, { type AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { AnyType } from '../types/globalTypes';

type UseRequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTION';
  url: string;
  data?: string | null;
  manual?: boolean;
  immediate?: boolean;
  axiosConfig?: AxiosRequestConfig;
  clearPrevious?: boolean;
  key?: string;
};

export const useRequestConcurrent = (
  config: UseRequestOptions,
  deps: AnyType[] = [],
) => {
  const {
    method = 'GET',
    url,
    data: initialData = null,
    manual = false,
    immediate = !manual,
    axiosConfig = {},
  } = config;

  const [data, setData] = useState<AnyType>(initialData);
  const [error, setError] = useState<AnyType | null>(null);
  const [loading, setLoading] = useState(false);

  const mountedRef = useRef(true);
  const controllers = useRef<Map<string, AbortController>>(new Map());

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      controllers.current.forEach((c) => {
        c.abort();
      });

      controllers.current.clear();
    };
  }, []);

  const clearKey = useCallback((key?: string) => {
    if (!key) return;
    const curr = controllers.current.get(key);
    if (curr) {
      curr.abort();
    }

    controllers.current.delete(key);
  }, []);

  const execute = useCallback(
    async (
      override: Partial<UseRequestOptions & { clearPrevious?: boolean }> = {},
    ) => {
      setLoading(true);
      setError(null);

      const key =
        override.key || `${override.method || method}:${override.url || url}`;
      const clearPrev = override.clearPrevious ?? true;

      if (clearPrev) clearKey(key);

      const controller = new AbortController();

      controllers.current.set(key, controller);

      try {
        const response = await axios({
          method: override.method || method,
          url: override.url || url,
          data: override.data || initialData,
          signal: controller.signal,
          ...axiosConfig,
          ...override.axiosConfig,
        });

        if (!mountedRef.current) return response.data.data;

        setData(response.data.data);

        return response.data.data;
        // biome-ignore lint/suspicious/noExplicitAny: explanation
      } catch (error: any) {
        if (!mountedRef.current) return Promise.reject(error);

        const isCancelled =
          error.name === 'CancelledError' || error.name === 'AbortError';

        if (isCancelled) {
          setError({ cancelled: true, message: 'Request cancelled' });
        } else if (error instanceof axios.AxiosError) {
          setError({
            axiosError: true,
            status: error.response?.status,
            message: error.response?.data?.error ?? error.message,
            raw: error,
          });
        } else {
          setError({
            unexpected: true,
            message: 'An unknown error occurred, please contact admin!',
            raw: error,
          });
        }

        return Promise.reject(error);
        // finally
      } finally {
        const current = controllers.current.get(key);
        if (current === controller) controllers.current.delete(key);

        if (mountedRef.current) setLoading(false);
      }
    },
    [method, url, initialData, axiosConfig, clearKey],
  );

  useEffect(() => {
    if (manual) return;
    if (!immediate) return;

    execute().catch(() => {});
    // biome-ignore lint/correctness/useExhaustiveDependencies: explanation
  }, deps);

  return { data, loading, error, execute, clearKey, setData };
};
