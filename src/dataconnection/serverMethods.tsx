import { DiningHall, DiningHallName, Meal, MealID } from "./FoodScoopAppTypes/models";
import { CheckUserExistsReq, CheckUserExistsResp, SignUpReq, SignUpInResp, SignInReq } from "./FoodScoopAppTypes/re";
import { set, requestBuilder } from "./serverConn";

export const checkUserExists = async (email: string) => {
  const req: CheckUserExistsReq = { email };
  const resp: CheckUserExistsResp = await requestBuilder("get", "userexists", req);

  return resp.exists; 
};

export const signUp = async (email: string, name: string, password: string) => {
  const req: SignUpReq = { email, name, password };
  const resp: SignUpInResp = await requestBuilder("post", "signup", req);

  // Persist token to local storage
  set("email", email);
  set("token", resp.token);

  return true;
}

export const signIn = async (email: string, password: string) => {
  const req: SignInReq = { email, password };
  const resp: SignUpInResp = await requestBuilder("post", "signin", req);

  // Persist token to local storage
  set("email", email);
  set("token", resp.token);

  return true;
}

// export const getDiningHall = async (diningHallName: DiningHallName) => {
//   const dh: DiningHall = {};

//   return dh;
// }

// export const getMeal = async (mealID: MealID) => {
//   const meal: Meal = {};

//   return meal;
// }
