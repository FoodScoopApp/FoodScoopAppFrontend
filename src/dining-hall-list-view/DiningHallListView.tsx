import React, { useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { DietaryRestriction, DiningHall, DiningHallName, Meal, MealID, MealPeriod, MealPeriodName } from '../dataconnection/FoodScoopAppTypes/models';
import * as MealView from './MealItemView';

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

type DiningHallListProps = {
	diningHallName: DiningHallName
}

export default function DiningHallListView(props: DiningHallListProps) {
	const [useListView, setView] = useState(true)
	const diningHall = getDiningHall(props.diningHallName)
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
		<MealView.IconItem meal={item} />
	} />
}

function ListView(props: MealsViewProps) {
	return <FlatList data={props.meals} renderItem={({ item }) =>
		<MealView.ListItem meal={item} />
	} />
}

