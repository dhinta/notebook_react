import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [params, setParams] = useSearchParams();

  return {
    queryParams: params,
    setQueryParam: (key, val, shouldReplace = true) =>
      setParams((prev) => {
        if (!val) {
          prev.delete(key);
          return prev;
        }

        shouldReplace ? prev.set(key, val) : prev.append(key, val);
        return prev;
      }),
    deserialize: useCallback(() => {
      return params.entries().reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    }, [params]),
  };
}
