import React from 'react'

import LoginScreen from "../auth/LoginScreen";
import SignupScreen from "../auth/SignupScreen";
import HomeScreen from "../main/HomeScreen";

import { Ionicons } from "@expo/vector-icons";


import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Text, TouchableOpacity} from "react-native";

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}