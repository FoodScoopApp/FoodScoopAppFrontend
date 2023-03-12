import React, { Fragment, useEffect, useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import {
    DiningHall,
    DiningHallName,
} from "../dataconnection/FoodScoopAppTypes/models";
import {
    convertDiningHall,
    convertMealPeriods,
    getImageID,
} from "../dataconnection/FoodScoopAppTypes/converters";
import {
    getCurrentMealPeriodForDiningHall,
    getFilledDiningHall,
    getActivityLevels,
} from "../dataconnection/serverMethods";
import BetterImage from "../common/BetterImage";
import { ActivityLevelAggResp } from "../dataconnection/FoodScoopAppTypes/re";
import * as Progress from "react-native-progress";

type Props = NativeStackScreenProps<RootStackParamList, "HomeScreen">;
export default function HomeScreen({ navigation }: Props) {
    const [diningHalls, setDiningHalls] = useState([] as DiningHall[]);
    const [levels, setLevels] = useState<ActivityLevelAggResp | null>(null);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <>
                    <TouchableOpacity>
                        <Ionicons
                            name={"calendar"}
                            size={30}
                            style={{ marginLeft: 5, marginRight: 5 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ProfileScreen")}>
                        <Ionicons
                            name="person"
                            size={30}
                            style={{ marginRight: 5 }}
                        />
                    </TouchableOpacity>
                </>
            ),
            headerBackVisible: false,
        });

        const getDHs = async () => {
            setDiningHalls([]);
            for (let dh of Object.keys(convertDiningHall)) {
                const data = await getFilledDiningHall(
                    dh as DiningHallName,
                    new Date()
                );
                setDiningHalls((old) => [...old, data]);
            }
        };

        const getLevels = async () => {
            const newLevels = await getActivityLevels();
            setLevels(newLevels);
        };

        getDHs();

        getLevels();
        setInterval(getLevels, 1000 * 60);
    }, []);
    return (
        <ScrollView>
            <View style={styles.todayView}>
                <Text
                    style={{
                        fontSize: 25,
                        fontWeight: "bold",
                        marginLeft: 10,
                        marginTop: 10,
                    }}>
                    Recommendations
                </Text>
            </View>
            <View style={styles.mealPeriodsView}>
                <View style={styles.mealTimeView}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Breakfast
                    </Text>
                    <TouchableOpacity style={styles.mealTimeView}>
                        <Image
                            source={require("../../assets/logo.png")}
                            style={styles.image}
                        />
                        <Text>Breakfast Meal</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mealTimeView}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Lunch
                    </Text>
                    <TouchableOpacity style={styles.mealTimeView}>
                        <Image
                            source={require("../../assets/logo.png")}
                            style={styles.image}
                        />
                        <Text>Lunch Meal</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mealTimeView}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        Dinner
                    </Text>
                    <TouchableOpacity style={styles.mealTimeView}>
                        <Image
                            source={require("../../assets/logo.png")}
                            style={styles.image}
                        />
                        <Text>Dinner Meal</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {diningHalls.map((dh, i) => {
                    const mp = getCurrentMealPeriodForDiningHall(dh);

                    const title = (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                                onPress={() =>
                                    navigation.navigate("DiningHallListView", {
                                        diningHallName: dh.name,
                                    })
                                }>
                                <Text style={styles.restaurantName}>
                                    {convertDiningHall[dh.name] +
                                        (mp
                                            ? " - " +
                                              convertMealPeriods[mp.name]
                                            : "")}
                                </Text>
                                <Ionicons
                                    name={"chevron-forward-outline"}
                                    size={20}
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginHorizontal: 20,
                                }}>
                                { levels && levels[dh.name] ?
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}>
                                        <Progress.Bar
                                            progress={levels[dh.name]! / 100}
                                            width={128}
                                            color="#DB4D5B"
                                        />
                                        <Text style={{ marginHorizontal: 4 }}>
                                            {levels[dh.name]}%
                                        </Text>
                                    </View> : null }
                            </View>
                        </View>
                    );
                    if (!mp)
                        return (
                            <Fragment key={i}>
                                {title}
                                <Text style={styles.nomeal}>
                                    No meals are available right now, check
                                    again soon
                                </Text>
                            </Fragment>
                        );

                    const items = [];
                    for (let sub of mp.subcategories) {
                        if (!sub.mealsFilled) continue;
                        for (let m of sub.mealsFilled) {
                            // const m = sub.mealsFilled[0];
                            let name = m.name;
                            if (name.length > 50) {
                                name = name.substring(0, 50) + "...";
                            }
                            items.push([name, getImageID(m.id)]);
                        }
                    }
                    return (
                        <Fragment key={i}>
                            {title}
                            <FlatList
                                data={items}
                                horizontal={true}
                                renderItem={({ item }) => <Item name={item} />}
                            />
                        </Fragment>
                    );
                })}
            </View>
        </ScrollView>
    );
}

type ItemProps = { name: string[] };
const Item = ({ name }: ItemProps) => (
    <View style={styles.item}>
        <TouchableOpacity>
            <BetterImage source={{ uri: name[1] }} style={styles.image} />
            <Text style={styles.name}>{name[0]}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    nomeal: {
        padding: 20,
    },
    name: {
        fontSize: 15,
        paddingTop: 5,
        width: 100,
        textAlign: "center",
    },
    todayView: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
    },
    mealPeriodsView: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
    },
    mealTimeView: {
        flex: 1,
        margin: 10,
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 16,
        // resizeMode: "repeat",
        // flex: 1,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 20,
    },
});
