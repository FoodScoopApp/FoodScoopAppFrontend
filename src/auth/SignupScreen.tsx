import React, {useState} from "react";
import {Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {MultipleSelectList, SelectList} from "react-native-dropdown-select-list/index";

export default function SignupScreen({ navigation } : {navigation : any}) {
    const [name, setName] = useState("");
    const [mealPlan, setMealPlan] = useState("");
    const [restrictions, setRestrictions] = useState([])

    const meal_plans = [
        {key:'1', value: "11R"},
        {key:'2', value: "11P"},
        {key:'3', value: "14R"},
        {key:'4', value: "14P"},
        {key:'5', value: "19R"},
        {key:'6', value: "19P"},
    ]

    const diet_restrict = [
        {key:'V', value: "Vegetarian"},
        {key:'VG', value: "Vegan"},
        {key:'HL', value: "Halal"},
        {key:'LC', value: "Low Carbon"},
        {key:'HC', value: "High Carbon"},
        {key:'APNT', value: "Peanut Allergy"},
        {key:'ATNT', value: "Tree Nut Allergy"},
        {key:'AWHT', value: "Wheat Allergy"},
        {key:'AGTN', value: "Gluten Allergy"},
        {key:'ASOY', value: "Soy Allergy"},
        {key:'ASES', value: "Sesame Allergy"},
        {key:'AMLK', value: "Milk Allergy"},
        {key:'AEGG', value: "Egg Allergy"},
        {key:'ACSF', value: "Shellfish Allergy"},
        {key:'AFSH', value: "Fish Allergy"}
    ]

    return(
        <ScrollView>
            <View style={styles.nameView}>
                <Text style={styles.text}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder={"name"}
                    placeholderTextColor={"grey"}
                    value={name}
                    onChangeText={setName}/>
            </View>
            <SelectList
                boxStyles={styles.selectList}
                setSelected={(val: any) => setMealPlan(val)}
                data={meal_plans}
                save="value"
                search={false}
                placeholder={"Select Meal Plan"}
            />
            <MultipleSelectList
                boxStyles={styles.selectList}
                setSelected={(val: any) => setRestrictions(val)}
                data={diet_restrict}
                save="value"
                onSelect={() => alert(restrictions)}
                label="Categories"
                placeholder={"Select Dietary Restrictions"}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    nameView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 0,
    },
    text: {
        flexGrow: 1,
        paddingLeft: 30,
        fontSize: 18
    },
    input: {
        alignSelf: "stretch",
        flexGrow: 9,
        // minWidth: "80%",
        height: 40,
        margin: 12,
        marginHorizontal: 30,
        borderWidth: 1,
        padding: 10,
    },
    selectList: {
        marginHorizontal: 30,
        marginVertical: 10
    }
})