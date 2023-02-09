import axios, { AxiosRequestConfig } from "axios";
import { is } from "typescript-is";

// Constants
export type method = "get" | "post" | "delete";
export const APIURL = __DEV__
  ? "http://localhost/api/v1/"
  : "https://foodscoopapp.com/api/v1/";

// Errors
export const errorCreator = (code: ErrorCode) => code;

// Builds requests to send to the server
export const requestBuilder = async (
  type: method,
  endpoint: Endpoint,
  data: any,
  handleError = true
) => {
  const options: AxiosRequestConfig = {};

  // Add auth headers if found
  if (localStorage.getItem("email") && localStorage.getItem("token")) {
    options.auth = {
      username: localStorage.getItem("email") as string,
      password: localStorage.getItem("token") as string,
    };
  }

  if (data) {
    options.data = data;
  }

  try {
    const resp = await axios[type](APIURL + endpoint, options);

    try {
      const data = JSON.parse(resp.data);
      if (handleError && is<ErrorResp>(data)) throw errorCreator(data.error);

      return data;
    } catch {
      if (resp.status > 0 && resp.status < 400) {
        throw errorCreator("InternalServer"); // if sending success, but bad data, definitely a server error
      } else if (resp.status < 500) {
        throw errorCreator("BadRequest");
      } else {
        throw errorCreator("InternalServer");
      }
    }
  } catch {
    throw errorCreator("Internet");
  }
};
