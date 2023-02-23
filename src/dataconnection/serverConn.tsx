import axios, { AxiosRequestConfig } from "axios";
import { is } from "typia";
import { get } from "sync-storage";
import { APIURL } from "../../App";

// Errors
export const errorCreator = (code: ErrorCode, message?: string) => {
  return { code: code, message: message };
};

// Builds requests to send to the server
export const requestBuilder = async (
  type: method,
  endpoint: Endpoint,
  data: any,
  handleError = true
) => {
  const options: AxiosRequestConfig = {};

  // Add auth headers if found
  if (get("email") && get("token")) {
    const auth: Authorization = {
      username: get("email") as string,
      password: get("token") as string
    }
    options.headers = {
      Authorization: JSON.stringify(auth)
    };
  }

  if (data) {
    options.data = data;
  }

  try {
    const resp = await axios[type](APIURL + endpoint, options);

    try {
      const data = JSON.parse(resp.data);
      if (handleError && is<ErrorResp>(data))
        throw errorCreator(data.error, data.message);

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
