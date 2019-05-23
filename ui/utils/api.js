import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { BASE_URL, BASE_HOST } = publicRuntimeConfig;

export const login = async (email, password) => {
  const baseURL = process.browser ? BASE_URL : BASE_HOST;

  const loginData = await axios({
    method: 'POST',
    url: '/api/user/login',
    baseURL,
    data: {
      email,
      password,
    },
  });

  return loginData;
};
