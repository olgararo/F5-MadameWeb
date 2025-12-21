import { useState, useEffect } from 'react';

export const useArcanas = () => {
  const [arcanas, setArcanas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://madame-web-api.onrender.com')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch arcanas');
        return res.json();
      })
      .then(response => {
        setArcanas(response.data); // Api retunrs { success, data, count }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { arcanas, loading, error };
};