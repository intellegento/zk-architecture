import axios from "axios";
import query from "qs";
import isBrowser from "./utils/isBrowser";

const apiUrl = process.env.NEXT_PUBLIC_HOST;
const apiPath = process.env.NEXT_PUBLIC_API_PATH;

const getApiUrlByEnv = () => {
  return isBrowser() ? window.location.origin : apiUrl
}

const baseURL = `${getApiUrlByEnv()}${apiPath}`;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const request = (path, { data, qs, method } = {}) => {
  return axios({
    baseURL: baseURL,
    url: path,
    params: qs,
    headers,
    method,
    data,
    paramsSerializer: function (params) {
      return query.stringify(params, {
        encodeValuesOnly: true,
      });
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      if (error.response && error.response.status === 404) return undefined;
      if (error.response && error.response.status === 504) return undefined;
      return error.response;
    });
};

const api = {
  get(path, params) {
    return request(path, { method: "get", ...params });
  },

  post(path, data) {
    return request(path, { method: "post", data });
  },

  all(requests) {
    return Promise.all(requests);
  },
};

export default api;
