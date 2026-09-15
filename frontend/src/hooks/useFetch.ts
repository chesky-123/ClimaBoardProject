import { useState } from 'react'

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const doFetch = async (url: string, options = {}) => {
    setLoading(true);
    setError(false);
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false);
      return data; 
    } catch (err) {
      console.error(err);
      setError(true);
      setLoading(false);
      return null;
    }
  }

  return { doFetch, loading, error };
}