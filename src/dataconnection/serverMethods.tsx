import moment from "moment";
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
    ActivityLevelAggResp,
    ActivityLevelResp,
    ActivityLevelReq,
} from "./FoodScoopAppTypes/re";
import { set, requestBuilder, getJSON, setJSON } from "./serverConn";
import { dateFormat } from "./FoodScoopAppTypes/converters";

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

export const getDiningHall = async (
    diningHallName: DiningHallName,
    date: Date,
    force = false
): Promise<DiningHall> => {
    if (!force) {
        const dh = await getJSON(
            diningHallName + moment(date).format(dateFormat)
        );
        if (dh) return dh;
    }
    const req: DiningHallReq = {
        diningHallName,
        date: moment(date).format(dateFormat),
    };
    const resp: DiningHallResp = await requestBuilder("get", "dininghall", req);

    setJSON(diningHallName + moment(date).format(dateFormat), resp.diningHall);

    return resp.diningHall;
};

export const getMeal = async (mealID: MealID, force = false): Promise<Meal> => {
    if (!force) {
        const meal = await getJSON(mealID);
        if (meal) return meal;
    }
    const req: MealReq = { mealID };
    const resp: MealResp = await requestBuilder("get", "meal", req);

    setJSON(mealID, resp.meal);

    return resp.meal;
};

export const getMealAgg = async (
    mealIDs: MealID[],
    force = false
): Promise<Meal[]> => {
    let needed = mealIDs;
    const meals: Meal[] = [];
    if (!force) {
        needed = [];
        for (let id of mealIDs) {
            const meal = await getJSON(id);
            if (!meal) needed.push(id);
            else meals.push(meal);
        }
    }

    let requestedMeals: Meal[] = [];

    if (needed.length > 0) {
        const req: MealAggReq = { mealIDs: needed.join(",") };
        const resp: MealAggResp = await requestBuilder("get", "mealagg", req);
        requestedMeals = resp.meals;
    }

    for (let meal of requestedMeals) {
        setJSON(meal.id, meal);
    }

    return meals.concat(requestedMeals);
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

/* Helper functions */

export const getFilledDiningHall = async (
    diningHallName: DiningHallName,
    date: Date,
    force = false
): Promise<DiningHall> => {
    if (!force) {
        const dh = await getJSON(
            diningHallName + moment(date).format(dateFormat) + "filled"
        );
        if (dh) return dh;
    }
    const diningHall = await getDiningHall(diningHallName, date, force);
    for (let i = 0; i < diningHall.mealPeriods.length; i++) {
        for (
            let j = 0;
            j < diningHall.mealPeriods[i].subcategories.length;
            j++
        ) {
            const meals = await getMealAgg(
                diningHall.mealPeriods[i].subcategories[j].meals,
                force
            );
            diningHall.mealPeriods[i].subcategories[j].mealsFilled = meals;
        }
    }

    setJSON(diningHallName + diningHall.date + "filled", diningHall);

    return diningHall;
};

export const getCurrentMealPeriodForDiningHall = (diningHall: DiningHall) => {
    for (let mp of diningHall.mealPeriods) {
        const now = moment();
        const start = moment(mp.startTime, "H:mm");
        const end = moment(mp.endTime, "H:mm");

        if (now.diff(start) > 0 && end.diff(now) > 0) {
            return mp;
        }
    }

    for (let mp of diningHall.mealPeriods) {
        const now = moment();
        const end = moment(mp.endTime, "H:mm");

        if (end.diff(now) > 0) {
            return mp;
        }
    }

    return null;
};

export const getActivityLevels = async () => {
    const resp: ActivityLevelAggResp = await requestBuilder(
        "get",
        "activity",
        {}
    );
    return resp;
};

export const getActivityLevel = async (diningHall: DiningHallName) => {
    const resp: ActivityLevelResp = await requestBuilder("get", "activity", {
        diningHall: diningHall,
    });
    return resp;
};
