import React from 'react';
import { FlatList, Text, View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { DietaryRestriction, DiningHall, DiningHallName, Meal, MealID, MealPeriod, MealPeriodName } from '../dataconnection/FoodScoopAppTypes/models';

function getMeal(id: MealID): Meal | null {
	// TODO: implementation
	return null
}

function getImage(id: MealID): ImageSourcePropType | null {
	// TODO: implementation
	return null
}

const styles = StyleSheet.create({
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
})

type MealItemProps = {
	meal: MealID,
}

export function IconItem(props: MealItemProps) {
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

export function ListItem(props: MealItemProps) {
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
