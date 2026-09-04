import { useState, useEffect } from 'react';

export const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const executeFetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchFn();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    executeFetch();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;
