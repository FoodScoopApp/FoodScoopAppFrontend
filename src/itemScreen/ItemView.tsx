import React from "react";
import { useEffect, useState } from "react";
import { Meal } from "../dataconnection/FoodScoopAppTypes/models";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Button,
    TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { changeUserProp, getMeal } from "../dataconnection/serverMethods";
import CustomFastImage from "../common/CustomFastImage";
import {
    accentColor,
    getImageID,
} from "../dataconnection/FoodScoopAppTypes/converters";
import { TagsView } from "../dining-hall-list-view/MealItemView";
import { Ionicons } from "@expo/vector-icons";
import { getJSON } from "../dataconnection/serverConn";

export type ItemViewProps = NativeStackScreenProps<RootStackParamList, "ItemView">;
export default function ItemView({ route, navigation }: ItemViewProps) {
    const [meal, setMeal] = useState<Meal>();
    const [uri, setURI] = useState<string>("");
    const [isFavorite, setIsFavorite] = useState(false);

    const initFavorite = async () => {
        const favmeals: string[] = await getJSON("favmeals");
        setIsFavorite(favmeals.includes(route.params.mealID));
    };

    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity
                onPress={async () => {
                    const isNewFav = !isFavorite;
                    setIsFavorite(isNewFav);
                    const favMeals: string[] = await getJSON("favmeals");
                    const idx = favMeals.indexOf(route.params.mealID);
                    if (idx > -1) {
                        if (!isNewFav) {
                            favMeals.splice(idx, 1);
                            changeUserProp({ favMeals });
                        }
                    } else {
                        if (isNewFav) {
                            favMeals.push(route.params.mealID);
                            changeUserProp({ favMeals });
                        }
                    }
                }}
            >
                <Ionicons
                    key={isFavorite ? 1 : 0}
                    color={accentColor}
                    name={isFavorite ? "star" : "star-outline"}
                    size={30}
                    style={{ marginRight: 5 }}
                />
            </TouchableOpacity>
        ),
    });

    useEffect(() => {
        console.log(route.params.mealID);
        async function getData() {
            let meal = await getMeal(route.params.mealID);
            setMeal(meal);
            setURI(getImageID(meal.id));
            navigation.setOptions({
                title: meal.name,
            });
        }

        getData();
        initFavorite();
    }, []);

    return (
        <ScrollView>
            <CustomFastImage
                key={uri}
                style={styles.imageView}
                source={{ uri: uri }}
                cacheKey={uri}
            />
            <Text style={styles.nameView}>
                {meal ? meal.name : "Meal name"}
            </Text>
            <View style={styles.tagsView}>
                <TagsView
                    size={30}
                    restrictions={meal ? meal.dietaryRestrictions : []}
                />
            </View>
            <Text style={styles.descriptionView}>
                {meal && meal.description
                    ? meal.description
                    : "No description provided."}
            </Text>
            <View style={styles.nutritionalView}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Nutritional Info
                </Text>
                <Text>
                    Calories:{" "}
                    {meal && meal.nutritionalInfo.calories
                        ? meal.nutritionalInfo.calories
                        : "N/A"}{" "}
                    calories
                </Text>
                <Text>
                    Protein:{" "}
                    {meal && meal.nutritionalInfo.protein
                        ? meal.nutritionalInfo.protein
                        : "N/A"}{" "}
                    grams
                </Text>
                <Text>
                    Sodium:{" "}
                    {meal && meal.nutritionalInfo.sodium
                        ? meal.nutritionalInfo.sodium
                        : "N/A"}{" "}
                    milligrams
                </Text>
            </View>
            <View style={styles.descriptionView}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Ingredients
                </Text>
                <Text>
                    {meal && meal.ingredients
                        ? meal.ingredients
                        : "No ingredients provided."}
                </Text>
            </View>
            <View style={{ margin: 50 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    nameView: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignSelf: "flex-start",
        fontWeight: "bold",
        fontSize: 30,
    },
    tagsView: {
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 25,
    },
    descriptionView: {
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 10,
        justifyContent: "space-evenly",
        alignSelf: "flex-start",
    },
    nutritionalView: {
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 15,
        marginTop: 5,
    },
    imageView: {
        alignSelf: "center",
        width: "110%",
        height: 300,
        resizeMode: "cover",
    },
    restrictions: {
        alignContent: "flex-start",
    },
    tagimage: {
        padding: 4,
        margin: 4,
        alignContent: "flex-start",
        alignSelf: "flex-start",
    },
});
