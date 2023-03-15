import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    ImageSourcePropType,
    Image,
    ImageURISource,
    TouchableOpacity,
} from "react-native";
import {
    DietaryRestriction,
    Meal,
    MealID,
} from "../dataconnection/FoodScoopAppTypes/models";
import { accentColor, getImageID } from "../dataconnection/FoodScoopAppTypes/converters";
import CustomFastImage from "../common/CustomFastImage";
import { Ionicons } from "@expo/vector-icons";
import { getJSON } from "../dataconnection/serverConn";
import { changeUserProp } from "../dataconnection/serverMethods";

const styles = StyleSheet.create({
    vstack: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 8,
        gap: 8,
        flexWrap: "wrap",
        width: "100%",
    },
    hstack: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        width: "70%",
    },
    iconimage: {
        width: 120,
        height: 120,
        borderRadius: 16,
    },
    listimage: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    tagimage: {
        width: 20,
        height: 20,
        margin: 2,
        alignContent: "space-around",
    },
    restrictions: {
        alignContent: "flex-start",
    },
});

type MealItemProps = {
    meal: Meal;
    press?: () => void;
};

export function IconItem(props: MealItemProps) {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [image, setImage] = useState<ImageSourcePropType | null>(null);
    useEffect(() => {
        const newMeal = props.meal;
        const newImage = getImageID(newMeal.id);
        setMeal(newMeal);
        setImage({ uri: newImage });
    }, []);
    if (meal == null) {
        return <></>;
    }
    return (
        <View style={styles.vstack}>
            <CustomFastImage
                source={{
                    uri: image ? (image as ImageURISource).uri ?? "" : "",
                }}
                style={styles.listimage}
                cacheKey={image ? (image as ImageURISource).uri ?? "" : ""}
            />
            <Text style={{ fontWeight: "bold" }}>{meal.name}</Text>
        </View>
    );
}

export function ListItem(props: MealItemProps) {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [image, setImage] = useState<ImageSourcePropType | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    const initFavorite = async () => {
        const favmeals: string[] = await getJSON("favmeals");
        setIsFavorite(favmeals.includes(props.meal.id));
    }

    useEffect(() => {
        const newMeal = props.meal;
        const newImage = getImageID(newMeal.id);
        setMeal(newMeal);
        setImage({ uri: newImage });
        initFavorite();
    }, []);

    if (meal == null) {
        return <></>;
    }
    return (
        <View style={styles.hstack}>
            {/* <BetterImage source={image} style={styles.listimage} /> */}
            <TouchableOpacity
                style={{flexDirection: "row"}}
                onPress={() => props.press ? props.press() : null}>
                <CustomFastImage
                    source={{
                        uri: image ? (image as ImageURISource).uri ?? "" : "",
                    }}
                    style={styles.listimage}
                    cacheKey={image ? (image as ImageURISource).uri ?? "" : ""}
                />
                <View style={styles.vstack}>
                    <Text style={{ fontWeight: "bold" }}>{meal.name}</Text>
                    <TagsView restrictions={meal.dietaryRestrictions} />
                    <Text>{meal.description}</Text>
                    {/* <Text>{meal.description}</Text> */}
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={async () => {
                    const isNewFav = !isFavorite;
                    setIsFavorite(isNewFav);
                    const favMeals: string[] = await getJSON("favmeals");
                    const idx = favMeals.indexOf(meal?.id ?? "");
                    if (idx > -1) {
                        if (!isNewFav) {
                            favMeals.splice(idx, 1);
                            changeUserProp({ favMeals });
                        }
                    } else {
                        if (isNewFav) {
                            favMeals.push(meal.id);
                            changeUserProp({ favMeals });
                        }
                    }
                }}
            >
                <Ionicons
                    key={isFavorite ? 1 : 0}
                    name={isFavorite ? "star" : "star-outline"}
                    size={30}
                    color={accentColor}
                />
            </TouchableOpacity>
        </View>
    );
}

type RestrictionTagsProps = {
    restrictions: DietaryRestriction[];
};

export const dietaryRestrictionsImages: {
    [Property in DietaryRestriction]: any;
} = {
    V: require("../../assets/tags/V.png"),
    VG: require("../../assets/tags/VG.png"),
    ACSF: require("../../assets/tags/ACSF.png"),
    AEGG: require("../../assets/tags/AEGG.png"),
    AFSH: require("../../assets/tags/AFSH.png"),
    AGTN: require("../../assets/tags/AGTN.png"),
    AMLK: require("../../assets/tags/AMLK.png"),
    APNT: require("../../assets/tags/APNT.png"),
    ASES: require("../../assets/tags/ASES.png"),
    ASOY: require("../../assets/tags/ASOY.png"),
    ATNT: require("../../assets/tags/ATNT.png"),
    AWHT: require("../../assets/tags/AWHT.png"),
    HAL: require("../../assets/tags/HAL.png"),
    HC: require("../../assets/tags/HC.png"),
    LC: require("../../assets/tags/LC.png"),
};

export function TagsView(props: RestrictionTagsProps) {
    return (
        <FlatList
            style={styles.restrictions}
            data={props.restrictions}
            horizontal={true}
            scrollEnabled={false}
            renderItem={({ item }) => {
                return (
                    <Image
                        style={styles.tagimage}
                        source={dietaryRestrictionsImages[item]}
                    />
                );
            }}
        />
    );
}
