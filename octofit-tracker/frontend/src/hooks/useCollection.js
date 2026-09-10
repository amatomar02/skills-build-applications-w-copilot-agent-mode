import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export const useCollection = (resource) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchCollection(resource)
      .then((data) => {
        if (!controller.signal.aborted) {
          setItems(data);
          setError(null);
        }
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [resource]);

  return { items, loading, error };
};
