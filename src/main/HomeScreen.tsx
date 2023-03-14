import React, { Fragment, useEffect, useState } from "react";
import {
	FlatList,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import {
    DiningHall,
    DiningHallName,
} from "../dataconnection/FoodScoopAppTypes/models";
import {
    accentColor,
    convertDiningHall,
    convertMealPeriods,
    getImageID,
} from "../dataconnection/FoodScoopAppTypes/converters";
import {
	getCurrentMealPeriodForDiningHall,
	getFilledDiningHall,
	getActivityLevels,
	updatePushToken,
} from "../dataconnection/serverMethods";
import BetterImage from "../common/BetterImage";
import { ActivityLevelAggResp } from "../dataconnection/FoodScoopAppTypes/re";
import * as Progress from "react-native-progress";
import moment from "moment";
import CustomFastImage from "../common/CustomFastImage";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

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
                            style={{ marginLeft: 20, marginRight: 20 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ProfileScreen")}
                    >
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
                try {
                    const data = await getFilledDiningHall(
                        dh as DiningHallName,
                        new Date()
                    );
                    setDiningHalls((old) => [...old, data]);
                } catch {}
            }
        };

        const getLevels = async () => {
            try {
                const newLevels = await getActivityLevels();
                setLevels(newLevels);
            } catch (err) {
                console.error(err);
            }
        };

		const updateToken = async () => {
			if (Device.isDevice) {
				const { status: existingStatus } = await Notifications.getPermissionsAsync()
					await Notifications.requestPermissionsAsync()
					const token = (await Notifications.getExpoPushTokenAsync()).data
					console.log(`token is ${token}`)
				if (existingStatus !== 'granted') {
					await updatePushToken({
						token: token,
						device: Platform.OS === "ios" ? "iOS" : "Android"
					})
				}
			}
		};
		updateToken();


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
                    }}
                >
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
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                                onPress={() =>
                                    navigation.navigate("DiningHallListView", {
                                        diningHallName: dh.name,
                                    })
                                }
                            >
                                <Text style={styles.restaurantName}>
                                    {convertDiningHall[dh.name]}
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
                                }}
                            ></View>
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
                            if (name.length > 30) {
                                name = name.substring(0, 30) + "...";
                            }
                            items.push([name, getImageID(m.id)]);
                        }
                    }

                    const start = moment(mp.startTime, "H:mm").format("h:mm a");
                    const end = moment(mp.endTime, "H:mm").format("h:mm a");

                    return (
                        <View key={i} style={{ marginBottom: 30 }}>
                            {title}
                            {levels && levels[dh.name] ? (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Progress.Bar
                                        progress={levels[dh.name]! / 100}
                                        width={128}
                                        color={accentColor}
                                        style={{ marginLeft: 20 }}
                                    />
                                    <Text style={{ marginHorizontal: 4 }}>
                                        {levels[dh.name]}%
                                    </Text>
                                </View>
                            ) : null}
                            <Text style={styles.mealperiod}>
                                {convertMealPeriods[mp.name] +
                                    " (" +
                                    start +
                                    " - " +
                                    end +
                                    ")"}
                            </Text>
                            <FlatList
                                data={items}
                                horizontal={true}
                                renderItem={({ item }) => <Item name={item} />}
                            />
                        </View>
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
            <CustomFastImage
                source={{
                    uri: name[1],
                }}
                style={styles.image}
                cacheKey={name[1]}
            />
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
    mealperiod: {
        paddingLeft: 20,
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
