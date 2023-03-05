import React, {useState} from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View, ScrollView, Button
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { checkUserExists } from "../dataconnection/serverMethods";

export default function LoginScreen({ navigation } : {navigation : any}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login() {
        //Do login stuff here, then go to home page
        checkUserExists("ea_do@icloud.com").then(exists => {
            console.log(exists)
        });
        navigation.navigate("HomeScreen");
    }

    function signup() {
        //Do signup stuff here, like navigate to signup page
        navigation.navigate("SignupScreen");
    }

    return(
        <ScrollView>
            <View style={styles.logoView}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.image}/>
                <Text style={styles.titleText}>FoodScoop</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder={"email"}
                    placeholderTextColor={"grey"}
                    value={email}
                    onChangeText={setEmail}/>
                <TextInput
                    style={styles.input}
                    placeholder={"password"}
                    placeholderTextColor={"grey"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}/>
                <LinearGradient
                    colors={["#DE6437", "#D93C78"]}
                    style={styles.loginButton}>
                    <TouchableOpacity onPress={() => login()}>
                        <Text style={{fontSize: 16}}>Log In</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <Button
                    title={"No account? Sign up!"}
                    color={"#DC5058"}
                    onPress={() => signup()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        borderRadius: 16
    },
    titleText: {
        fontFamily: "Avenir",
        fontSize: 40,
        marginLeft: 20
    },
    logoView: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        width: Dimensions.get("screen").width - 50,
        paddingTop: Dimensions.get("screen").height / 2 - 250
    },
    inputView: {
        paddingTop: 50,
    },
    input: {
        height: 40,
        margin: 12,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
    },
    loginButton: {
        height: 40,
        margin: 12,
        marginHorizontal: 30,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    }
});