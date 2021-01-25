import { ApiClient } from "./client";

const ID_TOKEN_KEY = "id_token";
const USERNAME = "username";

export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const getUsername = () => {
  return window.localStorage.getItem(USERNAME);
};

export const saveCredentials = (username, token) => {
  window.localStorage.setItem(USERNAME, username);
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyCredentials = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(USERNAME);
  const apiClient = ApiClient.instance;
  apiClient.authentications.api_key.apiKeyPrefix = "Bearer";
  delete apiClient.authentications.api_key.apiKey;
};

export const setHeader = () => {
  const apiClient = ApiClient.instance;
  apiClient.authentications.api_key.apiKeyPrefix = "Bearer";
  apiClient.authentications.api_key.apiKey = getToken();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getToken,
  getUsername,
  saveCredentials,
  destroyCredentials,
  setHeader
};
