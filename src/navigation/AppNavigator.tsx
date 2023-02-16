import React from 'react'

import LoginScreen from "../auth/LoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={"LoginScreen"}
                    component={LoginScreen}
                    options={{title: "Log In"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}