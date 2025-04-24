import { useEffect, useState, useMemo } from "react";
import { fetchDataFromApi } from "../../utils/api";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the params to prevent unnecessary re-renders
  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchDataFromApi(url, memoizedParams)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
        console.error("Error fetching data:", err);
      });
  }, [url, memoizedParams]); // Now using memoizedParams as the dependency

  return { data, loading, error };
};

export default useFetch;
