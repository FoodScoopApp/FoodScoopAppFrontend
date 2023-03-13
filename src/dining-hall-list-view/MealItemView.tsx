import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    ImageSourcePropType,
    Image,
} from "react-native";
import BetterImage from "../common/BetterImage";
import {
    DietaryRestriction,
    Meal,
    MealID,
} from "../dataconnection/FoodScoopAppTypes/models";
import { getMeal } from "../dataconnection/serverMethods";
import { getImageID } from "../dataconnection/FoodScoopAppTypes/converters";

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
        width: 24,
        height: 24,
        padding: 4,
        margin: 4,
        alignContent: "center",
    },
    restrictions: {
        alignContent: "flex-start",
    },
});

type MealItemProps = {
    meal: MealID;
};

export function IconItem(props: MealItemProps) {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [image, setImage] = useState<ImageSourcePropType | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const newMeal = await getMeal(props.meal);
            const newImage = getImageID(newMeal.id);
            setMeal(newMeal);
            setImage({ uri: newImage });
        };
        fetchData().catch(console.error);
    }, []);
    if (meal == null) {
        return <></>;
    }
    return (
        <View style={styles.vstack}>
            <BetterImage source={image} style={styles.listimage} />
            <Text style={{ fontWeight: "bold" }}>{meal.name}</Text>
        </View>
    );
}

export function ListItem(props: MealItemProps) {
    const [meal, setMeal] = useState<Meal | null>(null);
    const [image, setImage] = useState<ImageSourcePropType | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const newMeal = await getMeal(props.meal);
            const newImage = getImageID(newMeal.id);
            setMeal(newMeal);
            setImage({ uri: newImage });
            console.log(newImage);
        };
        fetchData().catch(console.error);
    }, []);
    if (meal == null) {
        return <></>;
    }
    return (
        <View style={styles.hstack}>
            <BetterImage source={image} style={styles.listimage} />
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

export function getRestrictionIcons(
    restrictions: DietaryRestriction[]
): string[] {
    return restrictions.map(
        (item) =>
            "https://menu.dining.ucla.edu/Content/Images/WebCodes/128px/" +
            item +
            ".png"
    );
}

export function TagsView(props: RestrictionTagsProps) {
    return (
        <FlatList
            style={styles.restrictions}
            data={getRestrictionIcons(props.restrictions)}
            horizontal={true}
            renderItem={({ item }) => (
                <Image style={styles.tagimage} source={{ uri: item }} />
            )}
        />
    );
}
