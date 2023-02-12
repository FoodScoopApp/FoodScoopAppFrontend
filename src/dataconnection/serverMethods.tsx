import { is } from "typia";
import { errorCreator, requestBuilder } from "./serverConn";

export const checkUserExists = async (email: string) => {
  const req: CheckUserExistsReq = { email };
  const resp = await requestBuilder("get", "userexists", req);

  if (!is<CheckUserExistsResp>(resp)) throw errorCreator("InternalServer");
  return resp.exists;
};

export const signUp = async (email: string, name: string, password: string) => {
  const req: SignUpReq = { email, name, password };
  const resp = await requestBuilder("post", "signup", req);

  if (!is<SignUpInResp>(resp)) throw errorCreator("InternalServer");

  // Persist token to local storage
  localStorage.setItem("email", email);
  localStorage.setItem("token", resp.token);

  return true;
}

export const signIn = async (email: string, password: string) => {
  const req: SignInReq = { email, password };
  const resp = await requestBuilder("post", "signin", req);

  if (!is<SignUpInResp>(resp)) throw errorCreator("InternalServer");

  // Persist token to local storage
  localStorage.setItem("email", email);
  localStorage.setItem("token", resp.token);

  return true;
}
