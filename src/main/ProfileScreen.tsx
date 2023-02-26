import React, { useState, Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

export default function ProfileScreen({ navigation }) {
    let [name, setName] = useState('Omar "Eado" Elamri');
    const data = [
        {key:'1', value:'11R'},
        {key:'2', value:'11P'},
        {key:'3', value:'14R'},
        {key:'4', value:'14P'},
        {key:'5', value:'19R'},
        {key:'6', value:'19P'}
    ]

    function preferences() {
        navigation.navigate("PreferencesScreen");
    }

    return (
        <ScrollView>
            <View style={styles.nameView}>
                <Image
                    source={require("../../assets/logo.png")}
                    style={styles.image} />
                <Text>{name}</Text>
            </View>
            <View style={styles.diningPlanView}>
                <Text style={{paddingTop: 12}}>Dining Plan</Text>
                <SelectList
                    data={data}
                    search={false}
                    save="value"
                    style={styles.diningPlanSelector}
                />
            </View>
            <TouchableOpacity style={styles.menuButton} onPress={() => preferences()}>
                <Text>Preferences</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
                <Text>Dietary Restrictions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton}>
                <Text>Nutritional Information</Text>
            </TouchableOpacity>
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
        justifyContent: "left",
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