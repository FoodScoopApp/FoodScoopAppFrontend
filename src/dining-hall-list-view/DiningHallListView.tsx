import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { DiningHall, DiningHallName, Meal, MealID, MealPeriod } from '../dataconnection/FoodScoopAppTypes/models';
import { IconItem, ListItem } from './MealItemView';
import { Ionicons } from '@expo/vector-icons';
import { getCurrentMealPeriodForDiningHall, getDiningHall, getFilledDiningHall } from '../dataconnection/serverMethods';
import { convertDiningHall } from '../dataconnection/FoodScoopAppTypes/converters';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const styles = StyleSheet.create({
	cell: {
		marginBottom: 40
	},
	iconimage: {
		width: 120,
		height: 120,
		borderRadius: 16
	},
	listimage: {
		width: 80,
		height: 80,
		borderRadius: 16
	},
	subcategoryName: {
		fontSize: 24,
		fontWeight: 'bold',
	},
});

type Props = NativeStackScreenProps<RootStackParamList, "DiningHallListView">;
export default function DiningHallListView({ route, navigation }: Props) {
	const [useListView, setView] = useState(true)
	const [diningHall, setDiningHall] = useState<DiningHall | null>(null)
	const [period, setPeriod] = useState<MealPeriod | null>(null)
	const diningHallName = route.params.diningHallName as DiningHallName
	const convertedName = convertDiningHall[diningHallName]
	useEffect(() => {
		navigation.setOptions({
			title: convertedName,
			headerRight: () => (
				// TODO: other views, star, home, filter
				// <TouchableOpacity onPress={() => useListView ? setView(false) : setView(true)}>
				// 	<Ionicons name={useListView ? "list" : "grid"} size={30} color="black" style={{ marginRight: 5 }} />
				// </TouchableOpacity>
				null
			),
		});
		const fetchDiningHall = async () => {
			const diningHall = await getFilledDiningHall(diningHallName, new Date())
			const currentPeriod = getCurrentMealPeriodForDiningHall(diningHall);
			setDiningHall(diningHall)
			setPeriod(currentPeriod)
		}
		fetchDiningHall().catch(console.error)
	}, [])
	if (diningHall == null) {
		return <></>
	}
	if (period == null) {
		return <></>
	}
	return <>
		<FlatList data={period.subcategories} style={{padding: 20}} renderItem={({ item } ) =>
			<View
				style={styles.cell}>
				<TouchableOpacity onPress={async () => {
					navigation.navigate("DiningHallSubcategoryScreen", { subcategory: item })
				}}>
					<Text style={styles.subcategoryName}>{ item.name }</Text>
				</TouchableOpacity>
				<Dishes listMode={useListView} meals={item.mealsFilled ?? []} />
			</View>
		} />
	</>
}

function Dishes(props: MealsViewProps) {
	if (props.listMode) {
		return ListView(props)
	} else {
		return IconsView(props)
	}
}

type MealsViewProps = {
	listMode: boolean,
	meals: Meal[],
}

function IconsView(props: MealsViewProps) {
	return <FlatList data={props.meals} horizontal={true} renderItem={({ item }) =>
		<IconItem meal={item} />
	} />
}

function ListView(props: MealsViewProps) {
	return <FlatList data={props.meals} renderItem={({ item }) =>
		<ListItem meal={item} />
	} />
}
