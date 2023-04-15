import React, { ReactElement } from "react";
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

type Ingredient = string | Ingredient[];

export type ItemViewProps = NativeStackScreenProps<
    RootStackParamList,
    "ItemView"
>;
export default function ItemView({ route, navigation }: ItemViewProps) {
    const [meal, setMeal] = useState<Meal>();
    const [uri, setURI] = useState<string>("");
    const [isFavorite, setIsFavorite] = useState(false);
    const [ingredients, setIngredients] = useState<Ingredient>();

    const initFavorite = async () => {
        const favmeals: string[] = await getJSON("favmeals");
        setIsFavorite(favmeals.includes(route.params.mealID));
    };

    const parseIngredients = (ingredients: string) => {
        const base: Ingredient[] = [];
        const refs: Ingredient[] = [];

        let current = base;

        let str = "";

        for (let i = 0; i < ingredients.length; i++) {
            const char = ingredients[i];
            if (char === "(") {
                if (str) current.push(str.trim());
                str = "";
                const newArr: Ingredient[] = [];
                current.push(newArr);
                refs.push(current);
                current = newArr;
            } else if (char === ")") {
                if (str) current.push(str.trim());
                str = "";
                if (refs.length < 1) return;
                current = refs.pop() as Ingredient[];
            } else if (char === ",") {
                if (str) current.push(str.trim());
                str = "";
                i++;
            } else {
                str = str + char;
            }
        }

        return current;
    };

    type NestedEl = ReactElement | ReactElement[];
    const ingredientsComponent = (
        ingredients: Ingredient,
        level = 0
    ): NestedEl => {
        if (Array.isArray(ingredients)) {
            return ingredients.map((ingred) =>
                ingredientsComponent(ingred, level + 1)
            ) as ReactElement[];
        } else {
            return (
                <View key={ingredients.repeat(level + 1)+Math.random()} style={styles.item}>
                    <Text
                        style={[
                            styles.itemText,
                            {
                                marginLeft: 30 * (level == 0 ? 0 : level - 1),
                                fontWeight:
                                    (level == 0 || level == 1) ? "bold" : undefined,
                            },
                        ]}>
                        {ingredients}
                    </Text>
                </View>
            );
        }
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
                }}>
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
            const ingreds = parseIngredients(meal.ingredients ?? "");
            setIngredients(ingreds);
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

            <View style={{ margin: 15 }} />

            <Text style={styles.subTitle}>Nutritional Info</Text>
            <View style={{ margin: 5 }} />

            <View style={styles.item}>
                <Text style={[styles.itemText, { fontWeight: "bold" }]}>
                    Calories
                </Text>
                <Text style={[styles.itemText, styles.itemEnd]}>
                    {meal && meal.nutritionalInfo.calories
                        ? meal.nutritionalInfo.calories
                        : "N/A"}{" "}
                    calories
                </Text>
            </View>
            <View style={styles.item}>
                <Text style={[styles.itemText, { fontWeight: "bold" }]}>
                    Protein
                </Text>
                <Text style={[styles.itemText, styles.itemEnd]}>
                    {meal && meal.nutritionalInfo.protein
                        ? meal.nutritionalInfo.protein
                        : "N/A"}{" "}
                    grams
                </Text>
            </View>
            <View style={styles.item}>
                <Text style={[styles.itemText, { fontWeight: "bold" }]}>
                    Sodium
                </Text>
                <Text style={[styles.itemText, styles.itemEnd]}>
                    {meal && meal.nutritionalInfo.sodium
                        ? meal.nutritionalInfo.sodium
                        : "N/A"}{" "}
                    milligrams
                </Text>
            </View>

            <View style={{ margin: 15 }} />

            <Text style={styles.subTitle}>Ingredients</Text>
            <View style={{ margin: 5 }} />
            {ingredients && ingredients.length > 0 ? (
                ingredientsComponent(ingredients)
            ) : (
                <View style={styles.item}>
                    <Text style={styles.itemText}>
                        No ingredients provided.
                    </Text>
                </View>
            )}

            <View style={{ margin: 50 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    nameView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignSelf: "flex-start",
        fontWeight: "bold",
        fontSize: 35,
    },
    subTitle: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 20,
    },
    tagsView: {
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 20,
    },
    descriptionView: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        justifyContent: "space-evenly",
        alignSelf: "flex-start",
        fontSize: 17,
    },
    nutritionalView: {
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
    itemEnd: {
        alignSelf: "flex-end",
        textAlign: "right",
    },
});
