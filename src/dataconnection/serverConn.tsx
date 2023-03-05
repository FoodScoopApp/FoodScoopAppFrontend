import axios, { AxiosRequestConfig } from "axios";
import {
  ErrorCode,
  Endpoint,
  Authorization,
  Method,
} from "./FoodScoopAppTypes/re";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
export const APIURL = __DEV__
  ? "http://169.232.81.26:8080/api/v1/"
  : "https://foodscoopapp.com/api/v1/";

// Storage
export const get = async (key: string) => await AsyncStorage.getItem(key);
export const set = async (key: string, data: any) =>
  await AsyncStorage.setItem(key, data);

// Errors
export const errorCreator = (code: ErrorCode, message?: any) => {
  return { code: code, message: message };
};

// Is wrapper: Can't do runtime checking, so always return true

// Builds requests to send to the server
export const requestBuilder = async (
  method: Method,
  endpoint: Endpoint,
  data: any,
  handleError = true
) => {
  const options: AxiosRequestConfig = {};
  // Add auth headers if found
  if ((await get("email")) && (await get("token"))) {
    const auth: Authorization = {
      username: (await get("email")) as string,
      password: (await get("token")) as string,
    };
    options.headers = {
      Authorization: JSON.stringify(auth),
    };
  }

  if (data) {
    if (method != "post") {
      options.params = data;
    } else {
      options.data = data;
    }
  }

  let resp;
  try {
    resp = await axios[method](APIURL + endpoint, options);
  } catch (err) {
    console.error(err);
    throw errorCreator("Internet");
  }

  try {
    const data = resp.data;
    if (handleError && data.error)
      throw errorCreator(data.error, data.message ? data.message : null);

    return data;
  } catch (err) {
    console.error(err);
    if (resp.status > 0 && resp.status < 400) {
      throw errorCreator("InternalServer"); // if sending success, but bad data, definitely a server error
    } else if (resp.status < 500) {
      throw errorCreator("BadRequest");
    } else {
      throw errorCreator("InternalServer");
    }
  }
};
