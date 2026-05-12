import React from 'react';
import isFunction from 'lodash/isFunction';
import api from '../lib/api';

const buildPath = (path, params) => {
  if (isFunction(path)) return path(params);
  return path;
}

function useFetch(path, defaultData) {
  const [data, setData] = React.useState(defaultData);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  async function fetch(params) {
    setLoading(true);
    try {
      const response = await api.get(buildPath(path, params), params);
      setData(response);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }

  return { data, isLoading, error, fetch };
}

export default useFetch;
