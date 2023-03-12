import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-ionicons';
import {changeUserProp, getUser} from "../dataconnection/serverMethods";
import {DiningHall, DiningHallName, User} from "../dataconnection/FoodScoopAppTypes/models";
import {convertDiningHall, getKeyByValue} from "../dataconnection/FoodScoopAppTypes/converters";
import {resolveAllWorkspacePackageJsonPaths} from "@expo/metro-config/build/getWatchFolders";

export default function PreferencesScreen({ navigation } : {navigation : any}) {
    //const [pullData, setPullData] = useState<DiningHallName[] | undefined>([]);
    const [selected, setSelected] = useState([]);
    const [user, setUser] = useState<User | undefined>(undefined)
    const data = [
        {key: '1', value: "Bruin Plate"},
        {key: '2', value: "Epicuria"},
        {key: '3', value: "De Neve"}
    ]

    useEffect(() => {
        async function getData() {
            let user = await getUser();
            setUser(user);
            console.log(user);
            //setPullData(user ? user.favDiningHalls : []);
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
                }}
                data={data}
                save="value"
            />
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
    }
});