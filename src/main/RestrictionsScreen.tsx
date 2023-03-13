import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import {changeUserProp, getUser} from "../dataconnection/serverMethods";
import {DietaryRestriction, DiningHall, DiningHallName, User} from "../dataconnection/FoodScoopAppTypes/models";
import {
    convertDietaryRestrictions,
    getKeyByValue
} from "../dataconnection/FoodScoopAppTypes/converters";

export default function RestrictionsScreen({ navigation } : {navigation : any}) {
    const [pullData, setPullData] = useState<DietaryRestriction[] | [string]>(["No dietary restrictions set"]);
    const [selected, setSelected] = useState([]);
    const [user, setUser] = useState<User | undefined>(undefined)

    const data = [
        {key: 1, value: "Vegetarian"},
        {key: 2, value: "Vegan"},
        {key: 3, value: "Contains Peanuts"},
        {key: 4, value: "Contains Tree Nutes"},
        {key: 5, value: "Contains Wheat"},
        {key: 6, value: "Contains Gluten"},
        {key: 7, value: "Contains Soy"},
        {key: 8, value: "Contains Sesame"},
        {key: 9, value: "Contains Dairy"},
        {key: 10, value: "Contains Eggs"},
        {key: 11, value: "Contains Crustacean Shellfish"},
        {key: 12, value: "Contains Fish"},
        {key: 13, value: "Halal"},
        {key: 14, value: "Low Carbon"},
        {key: 15, value: "High Carbon"},
    ]

    useEffect(() => {
        async function getData() {
            let user = await getUser();
            setUser(user);
            setPullData((user ? user.dietaryRestrictions : ["No dining halls set"])!);
        }
        getData()
    }, [])

    return (
        <ScrollView>
            <MultipleSelectList
                setSelected={async (val: any) => {
                    setSelected(val);
                    let toDietaryRestrictions: DietaryRestriction[] = []
                    selected.forEach((sel) => {
                        let currentDH: DietaryRestriction = getKeyByValue(convertDietaryRestrictions, sel) as DietaryRestriction;
                        toDietaryRestrictions.push(currentDH);
                    })
                    toDietaryRestrictions = toDietaryRestrictions.filter(function( element ) {
                        return element !== undefined;
                    });
                    await changeUserProp({dietaryRestrictions: toDietaryRestrictions})
                    let user = await getUser();
                    setUser(user);
                    setPullData((user ? user.dietaryRestrictions : ["No dietary restrictions set"])!);
                }}
                data={data}
                save="value"
            />
            <View>
                <Text style={styles.dhHeader}>Dietary Restrictions:</Text>
                {pullData.map((dr) => {
                    return (
                        <View>
                            <Text style={styles.dhItem}>{convertDietaryRestrictions[dr as DietaryRestriction]}</Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 16
    },
    titleText: {
        fontFamily: "Avenir",
        fontSize: 40,
        marginLeft: 20
    },
    nameView: {
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 25
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
        paddingBottom: 25
    },
    diningPlanSelector: {
        flexGrow: 9,
    },
    menuButton: {
        width: "100%",
        height: 40,
        alignItems: "center",
        borderColor: "gray",
        borderWidth: 1,
        justifyContent: "center",
        borderRadius: 10,
        marginTop: 10
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
    dhHeader: {
        fontWeight: "bold",
        fontSize: 24,
        margin: 10
    },
    dhItem: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 10
    }
});