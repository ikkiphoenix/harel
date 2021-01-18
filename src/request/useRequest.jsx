/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import instance from "./instance";

const useRequest = ({ method = "get", url, config }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRequest();
  }, []);

  const setRequest = async () => {
    try {
      const res = await instance[method](url, config);
      setResponse(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return [response, loading, error];
};

export default useRequest;
