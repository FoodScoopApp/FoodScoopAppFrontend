import React, { useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { DietaryRestriction, DiningHall, DiningHallName, Meal, MealID, MealPeriod, MealPeriodName } from '../dataconnection/FoodScoopAppTypes/models';

const styles = StyleSheet.create({
	cell: {

	},
	vstack: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 8,
		gap: 8,
	},
	hstack: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
		width: "100%"
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
	dishes: {

	}
})

type DiningHallListProps = {
	diningHallName: DiningHallName
}

function getDiningHall(name: DiningHallName): DiningHall | null {
	// TODO: implementation
	return null
}

function getPeriod(hall: DiningHall): MealPeriod | null {
	// TODO: implementation
	return null
}

function getMeal(id: MealID): Meal | null {
	// TODO: implementation
	return null
}

function getImage(id: MealID): ImageSourcePropType | null {
	// TODO: implementation
	return null
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

type MealsViewProps = {
	listMode: boolean,
	meals: MealID[],
}

function Dishes(props: MealsViewProps) {
	if (props.listMode) {
		return ListView(props)
	} else {
		return IconsView(props)
	}
}

function IconsView(props: MealsViewProps) {
	return <FlatList data={props.meals} horizontal={true} renderItem={({ item }) =>
		<IconItem meal={item} />
	} />
}

function IconItem(props: MealItemProps) {
	const meal = getMeal(props.meal)
	const image = getImage(props.meal)
	if (meal == null) {
		return <></>
	}
	if (image == null) {
		return <></>
	}
	return <View style={styles.vstack}>
		<Image
			source={image}
			style={styles.iconimage}
		/>
		<Text>{meal.name}</Text>
	</View>
}

function ListView(props: MealsViewProps) {
	return <FlatList data={props.meals} renderItem={({ item }) =>
		<ListItem meal={item} />
	} />
}

type MealItemProps = {
	meal: MealID,
}

function ListItem(props: MealItemProps) {
	const meal = getMeal(props.meal)
	const image = getImage(props.meal)
	if (meal == null) {
		return <></>
	}
	if (image == null) {
		return <></>
	}
	return <View style={styles.hstack}>
		<Image
			source={image}
			style={styles.listimage}
		/>
		<View style={styles.vstack}>
			<Text>{meal.name}</Text>
			<TagsView restrictions={meal.dietaryRestrictions} />
		</View>
		<Text>{
			meal.description
			// TODO: handle undefined
		}</Text>
	</View>
}

type RestrictionTagsProps = {
	restrictions: DietaryRestriction[]
}

function TagsView(props: RestrictionTagsProps) {
	// implementation
	return <Text>Nothing yet.</Text>
}
