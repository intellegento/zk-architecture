import React from "react";
import api from "../lib/api";

function useForm(path) {
  const [response, setResponse] = React.useState(undefined);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  async function makeRequest(data) {
    setLoading(true);
    try {
      const response = await api.post(path, data);
      if (response.status && response.status !== 200) {
        setError(true);
      } else {
        setResponse(response);
      }
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }

  return { response, isLoading, error, makeRequest };
}

export default useForm;
