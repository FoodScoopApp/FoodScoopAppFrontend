import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { DiningHall, MealID, MealPeriod } from '../dataconnection/FoodScoopAppTypes/models';
import { IconItem, ListItem } from './MealItemView';
import { Ionicons } from '@expo/vector-icons';
import { getDiningHall } from '../dataconnection/serverMethods';

const styles = StyleSheet.create({
	cell: {

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
})

function getPeriod(hall: DiningHall): MealPeriod | null {
	// TODO: implementation
	return null
}

export default function DiningHallListView({ route, navigation }: { route: any, navigation: any }) {
	const [useListView, setView] = useState(true)
	const [diningHall, setDiningHall] = useState<DiningHall | null>(null)
	const [period, setPeriod] = useState<MealPeriod | null>(null)
	const diningHallName = route.params.diningHallName
	useEffect(() => {
		navigation.setOptions({
			title: diningHallName,
			headerRight: () => (
				// TODO: other views, star, home, filter
				<TouchableOpacity onPress={() => useListView ? setView(false) : setView(true)}>
					<Ionicons name={useListView ? "list" : "grid"} size={30} color="black" style={{ marginRight: 5 }} />
				</TouchableOpacity>
			),
		});
		const fetchDiningHall = async () => {
			const diningHall = await getDiningHall(diningHallName)
			const currentPeriod = getPeriod(diningHall)
			setDiningHall(diningHall)
			setPeriod(currentPeriod)
		}
		fetchDiningHall().catch(console.error)
	})
	if (diningHall == null) {
		return <></>
	}
	if (period == null) {
		return <></>
	}
	return <>
		<FlatList data={period.subcategories} renderItem={({ item }) =>
			<View
				style={styles.cell}>
				<TouchableOpacity onPress={async () => {
					navigation.navigate("DiningHallSubcategoryScreen", { subcategory: item })
				}}>
					<Text style={styles.subcategoryName}>Subcategory</Text>
				</TouchableOpacity>
				<Dishes listMode={useListView} meals={item.meals} />
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
	meals: MealID[],
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
