import { envConfig } from "@core/envconfig";
import { httpRequest } from "./api";

export const camalize = function camalize(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const makeid = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
//Function to validate email
export const ValidateEmail = (email: any) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return Boolean(re.test(email));
};

export const routeTo = (store, path, routeAfter = 1000) =>
  setTimeout(() => {
    store.setState({ route: path });
  }, routeAfter);

/* eslint-disable implicit-arrow-linebreak */
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const imageUpload = async (files: any) => {
  debugger
  if(!files?.length > 0) {
    return 
  }
  let response = [];
  for (const iterator of files) {
    const formData = new FormData();
    formData.append('file', iterator);
    const res = await httpRequest('POST', `${envConfig.api_url}/files/upload`, formData, true);
    response.push(res?.data?.data?.url);
  }
  return response;
};
