import React, { useState, useEffect } from "react";
import {
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Button,
} from "react-native";
import {
    DietaryRestriction,
    DiningHall,
    DiningHallName,
    Meal,
    MealID,
    MealPeriod,
    User,
} from "../dataconnection/FoodScoopAppTypes/models";
import { ListItem } from "./MealItemView";
import { Ionicons } from "@expo/vector-icons";
import {
    getCurrentMealPeriodForDiningHall,
    getDiningHall,
    getFilledDiningHall,
    getUser,
} from "../dataconnection/serverMethods";
import {
    accentColor,
    convertDiningHall,
    inverseDietaryRestrictions,
} from "../dataconnection/FoodScoopAppTypes/converters";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { FilterView } from "../filter/FilterView";
import structuredClone from "@ungap/structured-clone";
import { get } from "../dataconnection/serverConn";

const styles = StyleSheet.create({
    cell: {
        marginBottom: 40,
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
    subcategoryName: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

type Props = NativeStackScreenProps<RootStackParamList, "DiningHallListView">;
export default function DiningHallListView({ route, navigation }: Props) {
    const [useListView, setView] = useState(true);
    const [diningHall, setDiningHall] = useState<DiningHall | null>(null);
    const [period, setPeriod] = useState<MealPeriod | null>(null);
    const [restrictions, setRestrictions] = useState<
        DietaryRestriction[] | null
    >();
    const [calories, setCalories] = useState<number | null>();
    const [modalVisible, setModalVisible] = useState(false);
    const diningHallName = route.params.diningHallName as DiningHallName;
    const convertedName = convertDiningHall[diningHallName];

    useEffect(() => {
        navigation.setOptions({
            title: convertedName,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Ionicons
                        color={accentColor}
                        name="filter"
                        size={30}
                        style={{ marginRight: 5 }}
                    />
                </TouchableOpacity>
            ),
        });
        const fetchData = async () => {
            const diningHall = await getFilledDiningHall(
                diningHallName,
                new Date()
            );
            const currentPeriod = getCurrentMealPeriodForDiningHall(diningHall);
            setDiningHall(diningHall);
            setPeriod(currentPeriod);

            if (!(await get("noautomaticfilter"))) {
                const user = await getUser();
                setCalories(user.caloricIntakePerDay ?? 0);
                setRestrictions(user.dietaryRestrictions ?? []);
            }
        };
        fetchData().catch(console.error);
    }, []);

    useEffect(() => {
        const newMP = structuredClone(
            diningHall?.mealPeriods.find((mp) => mp.name === period?.name)
        );
        if (!newMP) return;

        for (let j = 0; j < newMP.subcategories.length; j++) {
            if (!newMP.subcategories[j].mealsFilled) continue;

            newMP.subcategories[j].mealsFilled = newMP.subcategories[
                j
            ].mealsFilled?.filter((x) => {
                if (calories && calories !== 0) {
                    if (x.nutritionalInfo.calories > calories) return false;
                }
                if (restrictions && restrictions?.length > 0) {
                    if (x.dietaryRestrictions.length < 1) return false;
                    for (let fil of restrictions) {
                        if (inverseDietaryRestrictions.includes(fil)) {
                            if (x.dietaryRestrictions.includes(fil))
                                return false;
                        } else {
                            if (!x.dietaryRestrictions.includes(fil))
                                return false;
                        }
                    }
                }
                return true;
            });
        }
        setPeriod(newMP);
    }, [calories, restrictions]);

    if (diningHall == null) {
        return <></>;
    }
    if (period == null) {
        return <></>;
    }
    return (
        <>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View
                    style={{
                        alignItems: "flex-end",
                        paddingTop: 50,
                        marginLeft: 15,
                        flexDirection: "row-reverse",
                    }}
                >
                    <Button
                        color={accentColor}
                        title={"Done"}
                        onPress={() => setModalVisible(false)}
                    />
                </View>
                <FilterView
                    calories={calories ?? 0}
                    restrictions={restrictions ?? []}
                    setCalories={setCalories}
                    setRestrictions={setRestrictions}
                ></FilterView>
            </Modal>
            <FlatList
                data={period.subcategories}
                style={{ padding: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.cell}>
                        <TouchableOpacity
                            onPress={async () => {
                                // navigation.navigate("DiningHallSubcategoryScreen", { subcategory: item })
                            }}
                        >
                            {item.name.length > 2 ? (
                                <Text style={styles.subcategoryName}>
                                    {item.name}
                                </Text>
                            ) : null}
                        </TouchableOpacity>
                        <Dishes
                            listMode={useListView}
                            meals={item.mealsFilled ?? []}
                        />
                    </View>
                )}
            />
        </>
    );
}

function Dishes(props: MealsViewProps) {
    return ListView(props);
}

type MealsViewProps = {
    listMode: boolean;
    meals: Meal[];
};
function ListView(props: MealsViewProps) {
    return (
        <FlatList
            data={props.meals}
            renderItem={({ item }) => <ListItem meal={item} />}
        />
    );
}
