import React, {useEffect} from "react";
import {Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function HomeScreen({ navigation } : {navigation : any}) {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                    <Ionicons name="person-outline" size={30} color="black" style={{ marginRight: 5 }}/>
                </TouchableOpacity>
            ),
        });
    })
    return(
        <Text>This is the home screen placeholder.</Text>
    )
}