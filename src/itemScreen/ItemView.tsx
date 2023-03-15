import React from 'react';
import { 
    useEffect, 
    useState 
} from 'react';
import {
    Meal,
} from "../dataconnection/FoodScoopAppTypes/models";
import {
    Text,
    View,
    StyleSheet, ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigation/AppNavigator";
import {getMeal} from "../dataconnection/serverMethods";
import CustomFastImage from "../common/CustomFastImage";
import {getImageID} from "../dataconnection/FoodScoopAppTypes/converters";
import {TagsView} from "../dining-hall-list-view/MealItemView";

type Props = NativeStackScreenProps<RootStackParamList, "ItemView">;
export default function ItemView({ route, navigation }: Props) {
    const [meal, setMeal] = useState<Meal>();
    const [uri, setURI] = useState<string>("");

    useEffect(() => {
        async function getData() {
            let meal = await getMeal(route.params.mealID);
            setMeal(meal);
            setURI(getImageID(meal.id))
        }

        getData();
    }, [])

    return(
        <ScrollView>
            <CustomFastImage
                key={uri}
                style={styles.imageView}
                source={{ uri: uri}}
                cacheKey={uri}
            />
            <Text style={styles.nameView}>{meal ? meal.name : "Meal name"}</Text>
            <View style={styles.tagsView}>
                <TagsView restrictions={meal ? meal.dietaryRestrictions : []}/>
            </View>
            <Text style={styles.descriptionView}>{meal && meal.description ? meal.description : "No description provided."}</Text>
            <View style={styles.nutritionalView}>
                <Text style={{fontWeight: "bold"}}>Nutritional Info:</Text>
                <Text>Calories: {meal && meal.nutritionalInfo.calories ? meal.nutritionalInfo.calories : "N/A"} calories</Text>
                <Text>Protein: {meal && meal.nutritionalInfo.protein ? meal.nutritionalInfo.protein : "N/A"}g</Text>
                <Text>Sodium: {meal && meal.nutritionalInfo.sodium ? meal.nutritionalInfo.sodium : "N/A"}mg</Text>
            </View>
            <View style={styles.descriptionView}>
                <Text style={{fontWeight: "bold"}}>Ingredients: </Text>
                <Text>{meal && meal.ingredients ? meal.ingredients : "No ingredients provided."}</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameView: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: "bold"
    },
    tagsView: {
        alignItems: "center",
        marginTop: 5,
        marginBottom: 15
    },
    descriptionView: {
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 10,
        justifyContent: "space-evenly",
        alignSelf: 'center',
    },
    nutritionalView: {
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 15,
        marginTop: 5
    },
    imageView: {
        alignSelf: 'center',
        marginTop: 10,
        width: 340, 
        height: 200,
        borderRadius: 10,
    },
    restrictions: {
        alignContent: "flex-start",
    },
    tagimage: {
        width: 24,
        height: 24,
        padding: 4,
        margin: 4,
        alignContent: "center",
    },
})