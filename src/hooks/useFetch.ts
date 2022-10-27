import axios from 'axios';
import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { loading, data, error };
}

export default useFetch;
