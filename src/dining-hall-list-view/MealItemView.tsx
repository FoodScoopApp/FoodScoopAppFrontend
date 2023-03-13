import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    ImageSourcePropType,
    Image,
    ImageURISource,
} from "react-native";
import BetterImage from "../common/BetterImage";
import {
    DietaryRestriction,
    Meal,
    MealID,
} from "../dataconnection/FoodScoopAppTypes/models";
import { getMeal } from "../dataconnection/serverMethods";
import { getImageID } from "../dataconnection/FoodScoopAppTypes/converters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomFastImage from "../common/CustomFastImage";

const styles = StyleSheet.create({
    vstack: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 8,
        gap: 8,
        flexWrap: "wrap",
        width: "80%",
    },
    hstack: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        width: "100%",
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
        <View style={styles.hstack}>
            {/* <BetterImage source={image} style={styles.listimage} /> */}
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
        </View>
    );
}

type RestrictionTagsProps = {
    restrictions: DietaryRestriction[];
};

const imgRequire = {
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
                    <Image style={styles.tagimage} source={imgRequire[item]} />
                );
            }}
        />
    );
}
