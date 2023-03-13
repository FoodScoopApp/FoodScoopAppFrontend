import axios, { AxiosError, AxiosRequestConfig } from "axios";
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
};
export const setJSON = async (key: string, data: any) => {
    const datastr = JSON.stringify(data);
    await set(key, datastr);
};

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
            throw errorCreator("BadRequest");
        }
    } catch (err) {
        const error = err as AxiosError;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

            const resp = error.response.data as any;

            if (resp && resp.error) {
                throw errorCreator(resp.error);
            }

            if (error.response.status > 0 && error.response.status < 400) {
                throw errorCreator("InternalServer"); // if sending success, but bad data, definitely a server error
            } else if (error.response.status < 500) {
                console.log("bad")
                throw errorCreator("BadRequest");
            } else {
                throw errorCreator("Internet");
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error", error.message);
        }
        console.error(error.config);
        throw errorCreator("Internet");
    }

    try {
        const dataresp = resp.data;
        if (handleError && dataresp.error)
            throw errorCreator(dataresp.error, dataresp.message ? dataresp.message : null);

        console.log(endpoint)
        console.log(data)
        console.log(dataresp)
        return dataresp;
    } catch (err) {
        console.error(err);
    }
};
