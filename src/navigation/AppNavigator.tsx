import React, { useEffect, useState } from "react";

import LoginScreen from "../auth/LoginScreen";
import SignupScreen from "../auth/SignupScreen";
import HomeScreen from "../main/HomeScreen";
import DiningHallListView from "../dining-hall-list-view/DiningHallListView";

import ProfileScreen from "../main/ProfileScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiningHallSubcategoryView from "../dining-hall-subcategory-view/DiningHallSubcategoryView";
import { getUser } from "../dataconnection/serverMethods";
import {
    DiningHallName, MealID
} from "../dataconnection/FoodScoopAppTypes/models";
import { accentColor } from "../dataconnection/FoodScoopAppTypes/converters";
import { StatusBar } from "expo-status-bar";
import ItemView from "../itemScreen/ItemView";

export type RootStackParamList = {
    LoginScreen: undefined;
    SignupScreen: undefined;
    HomeScreen: undefined;
    ProfileScreen: undefined;
    DiningHallListView: { diningHallName: DiningHallName };
    ModalView: undefined,
    ItemView: { mealID: MealID },
};

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const initStack = [
        <Stack.Screen
            key={2}
            name={"LoginScreen"}
            component={LoginScreen}
            options={{ title: "Log In", gestureEnabled: false }}
        />,
        <Stack.Screen
            key={1}
            name={"SignupScreen"}
            component={SignupScreen}
            options={{ title: "Sign Up", gestureEnabled: false }}
        />,
        <Stack.Screen
            key={0}
            name={"HomeScreen"}
            component={HomeScreen}
            options={{ title: "Today" }}
        />,
        <Stack.Screen
            key={3}
            name={"ProfileScreen"}
            component={ProfileScreen}
            options={{ title: "Profile" }}
        />,
        <Stack.Screen
            key={6}
            name={"DiningHallListView"}
            component={DiningHallListView}
        />,
        <Stack.Screen
            key={7}
            name={"ItemView"}
            component={ItemView}
            options={{ title: "View Item" }}
        />
    ];

    const [stack, setStack] = useState([] as JSX.Element[]);

    useEffect(() => {
        getUser()
            .then((_) => {
                [initStack[0], initStack[2]] = [initStack[2], initStack[0]];
                setStack(initStack);
            })
            .catch(() => {
                setStack(initStack);
            });
    }, []);

    return stack.length > 0 ? (
        <NavigationContainer
            theme={{
                dark: false,
                colors: {
                    background: "white",
                    primary: accentColor,
                    border: "",
                    card: "",
                    notification: "",
                    text: accentColor,
                },
            }}
        >
            <StatusBar style={"dark"}></StatusBar>
            <Stack.Navigator>{stack}</Stack.Navigator>
        </NavigationContainer>
    ) : null;
}
