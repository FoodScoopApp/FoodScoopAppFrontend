import React, {useState} from "react";
import {Button, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {MultipleSelectList, SelectList} from "react-native-dropdown-select-list/index";
import {LinearGradient} from "expo-linear-gradient";
import {signIn, signUp} from "../dataconnection/serverMethods";

export default function SignupScreen({ navigation } : {navigation : any}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function createAccount() {
        //Do account creation stuff here
        try {
            await signUp(email, name, password);
            navigation.navigate("HomeScreen");
        } catch (e: any) {
            if(e.error == "AlreadyExists") alert("An account with this username already exists.");
            else alert("An error occurred when signing up.");
        }
    }

    // const [mealPlan, setMealPlan] = useState("");
    // const [restrictions, setRestrictions] = useState([])

    // const meal_plans = [
    //     {key:'1', value: "11R"},
    //     {key:'2', value: "11P"},
    //     {key:'3', value: "14R"},
    //     {key:'4', value: "14P"},
    //     {key:'5', value: "19R"},
    //     {key:'6', value: "19P"},
    // ]
    //
    // const diet_restrict = [
    //     {key:'V', value: "Vegetarian"},
    //     {key:'VG', value: "Vegan"},
    //     {key:'HL', value: "Halal"},
    //     {key:'LC', value: "Low Carbon"},
    //     {key:'HC', value: "High Carbon"},
    //     {key:'APNT', value: "Peanut Allergy"},
    //     {key:'ATNT', value: "Tree Nut Allergy"},
    //     {key:'AWHT', value: "Wheat Allergy"},
    //     {key:'AGTN', value: "Gluten Allergy"},
    //     {key:'ASOY', value: "Soy Allergy"},
    //     {key:'ASES', value: "Sesame Allergy"},
    //     {key:'AMLK', value: "Milk Allergy"},
    //     {key:'AEGG', value: "Egg Allergy"},
    //     {key:'ACSF', value: "Shellfish Allergy"},
    //     {key:'AFSH', value: "Fish Allergy"}
    // ]

    return(
        <ScrollView>
            <View style={styles.logoView}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.image}/>
                <Text style={styles.titleText}>FoodScoop</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder={"email"}
                placeholderTextColor={"grey"}
                value={email}
                onChangeText={setEmail}/>
            <TextInput
                style={styles.input}
                placeholder={"name"}
                placeholderTextColor={"grey"}
                value={name}
                onChangeText={setName}/>
            <TextInput
                style={styles.input}
                placeholder={"password"}
                placeholderTextColor={"grey"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}/>

            {/*<View style={styles.nameView}>*/}
            {/*    <Text style={styles.text}>Name:</Text>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        placeholder={"name"}*/}
            {/*        placeholderTextColor={"grey"}*/}
            {/*        value={name}*/}
            {/*        onChangeText={setName}/>*/}
            {/*</View>*/}
            {/*<SelectList*/}
            {/*    boxStyles={styles.selectList}*/}
            {/*    setSelected={(val: any) => setMealPlan(val)}*/}
            {/*    data={meal_plans}*/}
            {/*    save="value"*/}
            {/*    search={false}*/}
            {/*    placeholder={"Select Meal Plan"}*/}
            {/*/>*/}
            {/*<MultipleSelectList*/}
            {/*    boxStyles={styles.selectList}*/}
            {/*    setSelected={(val: any) => setRestrictions(val)}*/}
            {/*    data={diet_restrict}*/}
            {/*    save="value"*/}
            {/*    onSelect={() => alert(restrictions)}*/}
            {/*    label="Categories"*/}
            {/*    placeholder={"Select Dietary Restrictions"}*/}
            {/*/>*/}
            <LinearGradient
                colors={["#DE6437", "#D93C78"]}
                style={styles.loginButton}>
                <TouchableOpacity onPress={async () => await createAccount()}>
                    <Text style={{fontSize: 16}}>Create Account!</Text>
                </TouchableOpacity>
            </LinearGradient>
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
        paddingTop: Dimensions.get("screen").height / 2 - 250,
        paddingBottom: 40
    },
    nameView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 0,
    },
    text: {
        flexGrow: 1,
        paddingLeft: 30,
        fontSize: 18
    },
    input: {
        alignSelf: "stretch",
        flexGrow: 9,
        height: 40,
        margin: 12,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
    },
    selectList: {
        marginHorizontal: 30,
        marginVertical: 10
    },
    loginButton: {
        height: 40,
        margin: 12,
        marginHorizontal: 30,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    }
})