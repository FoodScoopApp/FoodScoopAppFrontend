import axios, { AxiosRequestConfig } from "axios";
import {
    ErrorCode,
    Endpoint,
    Authorization,
    Method,
} from "./FoodScoopAppTypes/re";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Constants
export const APIURL = "https://foodscoopapp.com/api/v1/";

// Storage
export const get = async (key: string) => await AsyncStorage.getItem(key);
export const set = async (key: string, data: string) =>
    await AsyncStorage.setItem(key, data);

export const getJSON = async (key: string) => {
  const data = await get(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
export const setJSON = async (key: string, data: any) => {
  const datastr = JSON.stringify(data);
  await set(key, datastr);
}

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
        }
    }

    let resp;
    try {
        if (method == "get") {
            resp = await axios.get(APIURL + endpoint, options);
        } else if (method == "post") {
            resp = await axios.post(APIURL + endpoint, data, options);
        } else {
            throw errorCreator;
        }
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
