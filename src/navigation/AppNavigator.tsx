import React, { useEffect, useState } from "react";

import LoginScreen from "../auth/LoginScreen";
import SignupScreen from "../auth/SignupScreen";
import HomeScreen from "../main/HomeScreen";
import modalView from "../modal/modalView";
import itemView from "../itemScreen/itemView"
import DiningHallListView from "../dining-hall-list-view/DiningHallListView";

import ProfileScreen from "../main/ProfileScreen";
import PreferencesScreen from "../main/PreferencesScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiningHallSubcategoryView from "../dining-hall-subcategory-view/DiningHallSubcategoryView";
import { getUser } from "../dataconnection/serverMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DiningHallName, Subcategory } from "../dataconnection/FoodScoopAppTypes/models";

export type RootStackParamList = {
    LoginScreen: undefined;
    SignupScreen: undefined;
    HomeScreen: undefined;
    ProfileScreen: undefined;
    PreferencesScreen: undefined;
    DiningHallSubcategoryScreen: { subcategory: Subcategory };
    DiningHallListView: { diningHallName: DiningHallName };
    ModalView: undefined,
    ItemView: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const initStack = [
        <Stack.Screen
            name={"ItemView"}
            component={itemView}
            options={{ title: "Item Screen" }} />,
        <Stack.Screen
            key={2}
            name={"LoginScreen"}
            component={LoginScreen}
            options={{ title: "Log In" }}
        />,
        <Stack.Screen
            key={1}
            name={"SignupScreen"}
            component={SignupScreen}
            options={{ title: "Sign Up" }}
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
            key={4}
            name={"PreferencesScreen"}
            component={PreferencesScreen}
            options={{ title: "Preferences" }}
        />,
        <Stack.Screen
            key={5}
            name={"DiningHallSubcategoryScreen"}
            component={DiningHallSubcategoryView}
        />,
        <Stack.Screen
            key={6}
            name={"DiningHallListView"}
            component={DiningHallListView}
        />,
        <Stack.Screen
            name={"ModalView"}
            component={modalView}
            options={{ title: "Filter Screen" }} />
    ];

    const [stack, setStack] = useState([] as JSX.Element[]);

    useEffect(() => {
        getUser()
            .then((_) => {
                // [initStack[0], initStack[2]] = [initStack[2], initStack[0]];
                setStack(initStack);
            })
            .catch(() => {
                setStack(initStack);
            });
    }, []);

    return stack.length > 0 ? (
        <NavigationContainer>
            <Stack.Navigator>{stack}</Stack.Navigator>
        </NavigationContainer>
    ) : null;
}
