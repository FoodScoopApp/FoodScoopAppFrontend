import React, {useEffect, useState} from "react";
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function HomeScreen({ navigation } : {navigation : any}) {
    const [bplateFood, setBplateFood] = useState<string[][]>([
            ["hello bplate", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"],
            ["hel;o bplat2", "https://thumbs.dreamstime.com/b/wooden-table-food-top-view-cafe-102532611.jpg"]
        ]);
    const [deneveFood, setDeneveFood] = useState<string[][]>([
            ["hello neved", "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60"],
            ["hello dveben", "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60"],
            ["b;aardbarl", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"],
            ["aardbarl2", "https://thumbs.dreamstime.com/b/wooden-table-food-top-view-cafe-102532611.jpg"],
            ["pookisPOOKISPOOKIESpok", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVRDk-Km-uX1z-5-NBVKYj-fGh7QR935Pb9YmpolA2g&s"],
            ["pookis", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVRDk-Km-uX1z-5-NBVKYj-fGh7QR935Pb9YmpolA2g&s"]
        ]);
    const [epicFood, setEpicFood] = useState<string[][]>([
            ["hello epucs", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVRDk-Km-uX1z-5-NBVKYj-fGh7QR935Pb9YmpolA2g&s"]
        ]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                    <Ionicons name="person-outline" size={30} color="black" style={{ marginRight: 5 }}/>
                </TouchableOpacity>
            ),
            headerBackVisible: false
        });
    })
    return(
        <ScrollView>
            <View style={styles.todayView}>
                <Text style={{fontSize: 30, fontWeight: "bold", marginRight: 5}}>Today</Text>
                <Ionicons name={"calendar-outline"} size={30}/>
            </View>
            <View style={styles.mealPeriodsView}>
                <View style={styles.mealTimeView}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Breakfast</Text>
                    <Image source={require("../../assets/logo.png")} style={styles.image}/>
                    <Text>Breakfast Meal</Text>
                </View>
                <View style={styles.mealTimeView}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Lunch</Text>
                    <Image source={require("../../assets/logo.png")} style={styles.image}/>
                    <Text>Lunch Meal</Text>
                </View>
                <View style={styles.mealTimeView}>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>Dinner</Text>
                    <Image source={require("../../assets/logo.png")} style={styles.image}/>
                    <Text>Dinner Meal</Text>
                </View>
            </View>
            <View>
                <Text style={styles.restaurantName}>Bruin Plate</Text>
                <FlatList data={bplateFood} horizontal={true} renderItem={({item}) => <Item name={item} />}/>
                <Text style={styles.restaurantName}>De Neve</Text>
                <FlatList data={deneveFood} horizontal={true} renderItem={({item}) => <Item name={item} />}/>
                <Text style={styles.restaurantName}>Epicuria</Text>
                <FlatList data={epicFood} horizontal={true} renderItem={({item}) => <Item name={item} />}/>
            </View>
        </ScrollView>
    )
}

type ItemProps = {name: string[]};

// @ts-ignore
const Item = ({name}: ItemProps) => (
    <View style={styles.item}>
        <Image source={{uri: name[1]}} style={{width: 80, height: 80, borderRadius: 16}}/>
        <Text style={styles.name}>{name[0]}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    name: {
        fontSize: 15,
        paddingTop: 5,
        width: 80,
        textAlign: "center"
    },
    todayView: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center"
    },
    mealPeriodsView: {
        flexDirection: "row",
        margin: 10,
        alignItems: "center"
    },
    mealTimeView: {
        flex: 1,
        margin: 10,
        alignItems: "center"
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 16,
        margin: 10
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 20
    }
});