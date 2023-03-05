import {
  DiningHall,
  DiningHallName,
  Meal,
  MealID,
} from "./FoodScoopAppTypes/models";
import {
  CheckUserExistsReq,
  CheckUserExistsResp,
  SignUpReq,
  SignUpInResp,
  SignInReq,
  DiningHallReq,
  DiningHallResp,
  MealReq,
  MealResp,
  MealAggReq,
  MealAggResp,
  UserResp,
  ChangeUserPropReq,
  ChangeUserPropResp,
} from "./FoodScoopAppTypes/re";
import { set, requestBuilder } from "./serverConn";

export const checkUserExists = async (email: string) => {
  const req: CheckUserExistsReq = { email };
  const resp: CheckUserExistsResp = await requestBuilder(
    "get",
    "userexists",
    req
  );

  return resp.exists;
};

export const signUp = async (email: string, name: string, password: string) => {
  const req: SignUpReq = { email, name, password };
  const resp: SignUpInResp = await requestBuilder("post", "signup", req);

  // Persist token to local storage
  set("email", email);
  set("token", resp.token);

  return true;
};

export const signIn = async (email: string, password: string) => {
  const req: SignInReq = { email, password };
  const resp: SignUpInResp = await requestBuilder("post", "signin", req);

  // Persist token to local storage
  set("email", email);
  set("token", resp.token);

  return true;
};

export const getDiningHall = async (diningHallName: DiningHallName) => {
  const req: DiningHallReq = { diningHallName };
  const resp: DiningHallResp = await requestBuilder("get", "dininghall", req);

  return resp.diningHall;
};

export const getMeal = async (mealID: MealID) => {
  const req: MealReq = { mealID };
  const resp: MealResp = await requestBuilder("get", "meal", req);

  return resp.meal;
};

export const getMealAgg = async (mealIDs: MealID[]) => {
  const req: MealAggReq = { mealIDs };
  const resp: MealAggResp = await requestBuilder("get", "mealagg", req);

  return resp.meals;
};

export const getUser = async () => {
  const resp: UserResp = await requestBuilder("get", "user", {});

  return resp.user;
};

export const changeUserProp = async (val: ChangeUserPropReq) => {
  const resp: ChangeUserPropResp = await requestBuilder(
    "post",
    "updateuser",
    val
  );

  return resp.success;
};
