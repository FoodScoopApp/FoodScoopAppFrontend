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
} from "react-native";
import { set } from "../dataconnection/serverConn";
import { changeUserProp, getUser } from "../dataconnection/serverMethods";
import {
    DietaryRestriction,
    DiningHallName,
    MealPlan,
    User,
} from "../dataconnection/FoodScoopAppTypes/models";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Checkbox from "expo-checkbox";
import {
    accentColor,
    convertDietaryRestrictions,
    convertDiningHall,
    convertErrorCode,
    mealPlans,
} from "../dataconnection/FoodScoopAppTypes/converters";
import { dietaryRestrictionsImages } from "../dining-hall-list-view/MealItemView";
import { ChangeUserPropReq } from "../dataconnection/FoodScoopAppTypes/re";
import Slider from "@react-native-community/slider";

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
                    <Button
                        title={"Sign Out"}
                        onPress={() => signOut()}
                        color={accentColor}
                    />
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

    const setUserProp = async (props: ChangeUserPropReq) => {
        if (!user) return;
        const initUser = { ...user };
        const changeUser = { ...user };
        try {
            Object.keys(props).forEach(function (key) {
                (changeUser as any)[key] =
                    (props as any)[key] ?? (changeUser as any)[key];
            });
            setUser(changeUser);
            await changeUserProp(props);
        } catch (e: any) {
            alert(convertErrorCode(e.code));
            setUser(initUser);
        }
    };

    const setUserPropArray = async (prop: string, val: any) => {
        const arr: any[] = (user as any)[prop];

        const idx = arr.indexOf(val);
        if (idx > -1) {
            arr.splice(idx, 1);
        } else {
            arr.push(val);
        }
        const obj: ChangeUserPropReq = {};
        (obj as any)[prop] = arr;
        setUserProp(obj);
    };

    return (
        <ScrollView>
            <Text style={nStyles.headerText}>Meal Plan</Text>
            {mealPlans.map((it, i) => (
                <TouchableOpacity
                    key={i}
                    onPress={() => setUserProp({ mealPlan: it })}
                >
                    <View style={nStyles.item}>
                        <Text style={nStyles.itemText}>{it}</Text>
                        <Checkbox
                            color={accentColor}
                            style={nStyles.itemCheckbox}
                            value={user?.mealPlan === it}
                        ></Checkbox>
                    </View>
                </TouchableOpacity>
            ))}

            <Text style={nStyles.headerText}>Dietary Restrictions</Text>
            {Object.entries(convertDietaryRestrictions).map((it, i) => (
                <TouchableOpacity
                    key={i}
                    onPress={() => {
                        setUserPropArray("dietaryRestrictions", it[0]);
                    }}
                >
                    <View style={nStyles.item}>
                        <Image
                            source={
                                dietaryRestrictionsImages[
                                    it[0] as DietaryRestriction
                                ]
                            }
                            style={nStyles.itemImage}
                        />
                        <Text style={nStyles.itemText}>
                            {it[1].replace("Contains", "No")}
                        </Text>
                        <Checkbox
                            color={accentColor}
                            style={nStyles.itemCheckbox}
                            value={
                                (user?.dietaryRestrictions?.indexOf(
                                    it[0] as DietaryRestriction
                                ) ?? -1) > -1
                            }
                        ></Checkbox>
                    </View>
                </TouchableOpacity>
            ))}
            <View
                style={[
                    nStyles.item,
                    { marginTop: 30, flexDirection: "column" },
                ]}
            >
                <Text
                    style={[
                        nStyles.itemText,
                        { fontWeight: "bold", marginBottom: 10 },
                    ]}
                >
                    Preferred Caloric Intake (per day)
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Slider
                        style={{ flex: 1 }}
                        minimumValue={0}
                        maximumValue={3000}
                        minimumTrackTintColor={accentColor}
                        onValueChange={(val) =>
                            setUserProp({
                                caloricIntakePerDay: Math.round(val),
                            })
                        }
                        step={100}
                        value={user?.caloricIntakePerDay ?? 0}
                    ></Slider>
                    <Text
                        style={{
                            marginLeft: 10,
                            width: 70,
                            textAlign: "right",
                        }}
                    >
                        {!user?.caloricIntakePerDay ||
                        user?.caloricIntakePerDay === 0
                            ? "0 (no limit)"
                            : user?.caloricIntakePerDay}{" "}
                        cals
                    </Text>
                </View>
            </View>

            <Text style={nStyles.headerText}>Favorite Dining Halls</Text>
            {Object.entries(convertDiningHall).map((it, i) => (
                <TouchableOpacity
                    key={i}
                    onPress={() => {
                        setUserPropArray("favDiningHalls", it[0]);
                    }}
                >
                    <View style={nStyles.item}>
                        <Text style={nStyles.itemText}>{it[1]}</Text>
                        <Checkbox
                            color={accentColor}
                            style={nStyles.itemCheckbox}
                            value={
                                (user?.favDiningHalls?.indexOf(
                                    it[0] as DiningHallName
                                ) ?? -1) > -1
                            }
                        ></Checkbox>
                    </View>
                </TouchableOpacity>
            ))}

            <View style={nStyles.end} />
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
    headerText: {
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: 10,
        marginTop: 40,
    },
    item: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        backgroundColor: "white",
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        justifyContent: "space-between",
    },
    itemText: {
        fontSize: 17,
        alignSelf: "flex-start",
        flex: 1,
    },
    itemCheckbox: {
        alignSelf: "flex-end",
    },
    itemImage: {
        height: 17,
        width: 17,
        marginRight: 5,
    },
    end: {
        margin: 50,
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
