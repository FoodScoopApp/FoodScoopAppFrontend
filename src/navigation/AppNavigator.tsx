import React from 'react'

import LoginScreen from "../auth/LoginScreen";
import SignupScreen from "../auth/SignupScreen";
import HomeScreen from "../main/HomeScreen";

import ProfileScreen from "../main/ProfileScreen";
import PreferencesScreen from '../main/PreferencesScreen';

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DiningHallListView from "../dining-hall-list-view/DiningHallListView";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"LoginScreen"}
                    component={LoginScreen}
                    options={{title: "Log In"}}/>
                <Stack.Screen
                    name={"SignupScreen"}
                    component={SignupScreen}
                    options={{title: "Sign Up"}}/>
                <Stack.Screen
                    name={"HomeScreen"}
                    component={HomeScreen}
                    options={{title: "Home"}}/>
                <Stack.Screen
                    name={"ProfileScreen"}
                    component={ProfileScreen}
                    options={{title: "Profile"}}/>    
                <Stack.Screen
                    name={"PreferencesScreen"}
                    component={PreferencesScreen}
                    options={{title: "Preferences"}}/>
                <Stack.Screen
                    name={"DiningHallListView"}
                    component={DiningHallListView}
                    options={{title: "Dining Hall"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}