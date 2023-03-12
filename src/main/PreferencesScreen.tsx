import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet, FlatList
} from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-ionicons';
import {changeUserProp, getUser} from "../dataconnection/serverMethods";
import {DiningHall, DiningHallName, User} from "../dataconnection/FoodScoopAppTypes/models";
import {convertDiningHall, getKeyByValue} from "../dataconnection/FoodScoopAppTypes/converters";
import {resolveAllWorkspacePackageJsonPaths} from "@expo/metro-config/build/getWatchFolders";

export default function PreferencesScreen({ navigation } : {navigation : any}) {
    const [pullData, setPullData] = useState<DiningHallName[] | [string]>(["No dining halls set"]);
    const [selected, setSelected] = useState([]);
    const [user, setUser] = useState<User | undefined>(undefined)

    const data = [
        {key: '1', value: "Bruin Plate"},
        {key: '2', value: "Epicuria at Covel"},
        {key: '3', value: "De Neve"},
        {key: '4', value: "Rendezvous West"},
        {key: '5', value: "Rendezvous East"},
        {key: '6', value: "Bruin Cafe"},
        {key: '7', value: "Epicuria at Ackerman"},
        {key: '8', value: "Study at Hedrick"},
        {key: '9', value: "The Drey"}
    ]

    useEffect(() => {
        async function getData() {
            let user = await getUser();
            setUser(user);
            setPullData((user ? user.favDiningHalls : ["No dining halls set"])!);
        }
        getData()
    }, [])

    return (
        <ScrollView>
            <MultipleSelectList
                setSelected={async (val: any) => {
                    setSelected(val);
                    let toDiningHalls: DiningHallName[] = []
                    selected.forEach((sel) => {
                        let currentDH: DiningHallName = getKeyByValue(convertDiningHall, sel) as DiningHallName;
                        toDiningHalls.push(currentDH);
                    })
                    toDiningHalls = toDiningHalls.filter(function( element ) {
                        return element !== undefined;
                    });
                    await changeUserProp({favDiningHalls: toDiningHalls})
                    let user = await getUser();
                    setUser(user);
                    setPullData((user ? user.favDiningHalls : ["No dining halls set"])!);
                }}
                data={data}
                save="value"
            />
            <View>
                <Text style={styles.dhHeader}>Favorite Dining Halls:</Text>
                {pullData.map((dh) => {
                    return (
                        <View>
                            <Text style={styles.dhItem}>{convertDiningHall[dh as DiningHallName]}</Text>
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