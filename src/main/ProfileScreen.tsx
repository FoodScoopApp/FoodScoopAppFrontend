import React, { useState, Component, useEffect } from "react";
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Button,
    FlatList,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { set } from "../dataconnection/serverConn";
import { changeUserProp, getUser } from "../dataconnection/serverMethods";
import { MealPlan, User } from "../dataconnection/FoodScoopAppTypes/models";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CheckBox } from "@re"

type Props = NativeStackScreenProps<RootStackParamList, "ProfileScreen">;
export default function ProfileScreen({ navigation }: Props) {
    let [user, setUser] = useState<User>();
    const [mealPlan, setMealPlan] = useState("");

    const data = [
        { key: "1", value: "11" },
        { key: "2", value: "14" },
        { key: "3", value: "19" },
    ];

    useEffect(() => {
        async function getData() {
            let user = await getUser();
            setUser(user);
            navigation.setOptions({
                title: user.name,
                headerRight: () => (
                    <Button title={"Sign Out"} onPress={() => signOut()} />
                ),
            });
        }
        getData();
    }, []);

    function preferences() {
        navigation.navigate("PreferencesScreen");
    }

    function restrictions() {
        navigation.navigate("RestrictionsScreen");
    }

    function signOut() {
        set("email", "");
        set("token", "");

        navigation.navigate("LoginScreen");
    }

    return (
        <ScrollView style={nStyles.scrollView}>
            <Text style={nStyles.headerText}>Meal Plan</Text>
            {["11", "14", "19"].map((it, i) => <View key={i}>
                <Text>{it}</Text>
                <CheckBox></CheckBox>
            </View>)}
            {/* <View style={styles.nameView}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.image} />
                <Text>{user ? user.name : "Loading..."}</Text>
            </View>
            <View style={styles.diningPlanView}>
                <Text style={{paddingTop: 12}}>Dining Plan</Text>
                <SelectList
                    data={data}
                    search={false}
                    save="value"
                    setSelected={async (val: any) => {
                        setMealPlan(val as MealPlan)
                        await changeUserProp({mealPlan: val as MealPlan})
                        let user = await getUser();
                        setUser(user);

                    }}
                />
            </View>
            <TouchableOpacity style={styles.menuButton} onPress={() => preferences()}>
                <Text>Preferences</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => restrictions()}>
                <Text>Dietary Restrictions</Text>
            </TouchableOpacity> */}
        </ScrollView>
    );
}

const nStyles = StyleSheet.create({
    scrollView: {
        paddingTop: 20,
    },
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 20
    },
});

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 16,
    },
    titleText: {
        fontFamily: "Avenir",
        fontSize: 40,
        marginLeft: 20,
    },
    nameView: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 25,
    },
    diningPlanView: {
        //alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 10,
        width: "100%",
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 25,
    },
    diningPlanSelector: {
        // flexGrow: 9,
    },
    menuButton: {
        width: "100%",
        height: 40,
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 1,
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 10,
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
    },
});
