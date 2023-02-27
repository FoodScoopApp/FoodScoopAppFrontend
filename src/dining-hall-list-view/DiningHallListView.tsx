import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { DiningHall, DiningHallName, MealID, MealPeriod } from '../dataconnection/FoodScoopAppTypes/models';
import { IconItem, ListItem } from './MealItemView';
import { Ionicons } from '@expo/vector-icons';

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

function getDiningHall(name: DiningHallName): DiningHall | null {
	// TODO: implementation
	return null
}

function getPeriod(hall: DiningHall): MealPeriod | null {
	// TODO: implementation
	return null
}

export default function DiningHallListView({ route, navigation }: { route: any, navigation: any }) {
	const [useListView, setView] = useState(true)
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				// TODO: other views
				<TouchableOpacity onPress={() => useListView ? setView(false) : setView(true) }>
					<Ionicons name={ useListView ? "list" : "grid" } size={30} color="black" style={{ marginRight: 5 }} />
				</TouchableOpacity>
			),
		});
	})
	const diningHall = getDiningHall(route.params.diningHallName)
	if (diningHall == null) {
		return <></>
	}
	const currentPeriod = getPeriod(diningHall)
	if (currentPeriod == null) {
		return <></>
	}
	return <>
		<FlatList data={currentPeriod.subcategories} renderItem={({ item }) =>
			<View
				style={styles.cell}>
				<Text style={styles.subcategoryName}>Subcategory</Text>
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
