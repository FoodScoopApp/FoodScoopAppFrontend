import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, ImageSourcePropType } from 'react-native';
import BetterImage from '../common/BetterImage';
import { DietaryRestriction, Meal, MealID } from '../dataconnection/FoodScoopAppTypes/models';
import { getMeal } from '../dataconnection/serverMethods';

export function getImageSource(id: Meal): ImageSourcePropType {
	// TODO: implementation
	return { url: "" } as ImageSourcePropType
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
	tagimage: {
		width: 24,
		height: 24,
		padding: 4,
		margin: 4,
	},
})

type MealItemProps = {
	meal: MealID,
}

export function IconItem(props: MealItemProps) {
	const [meal, setMeal] = useState<Meal | null>(null)
	const [image, setImage] = useState<ImageSourcePropType | null>(null)
	useEffect(() => {
		const fetchData = async () => {
			const newMeal = await getMeal(props.meal)
			const newImage = getImageSource(newMeal)
			setMeal(newMeal)
			setImage(newImage)
		}
		fetchData().catch(console.error)
	})
	if (meal == null) {
		return <></>
	}
	return <View style={styles.vstack}>
		<BetterImage source={image} style={styles.listimage} />
		<Text>{meal.name}</Text>
	</View>
}

export function ListItem(props: MealItemProps) {
	const [meal, setMeal] = useState<Meal | null>(null)
	const [image, setImage] = useState<ImageSourcePropType | null>(null)
	useEffect(() => {
		const fetchData = async () => {
			const newMeal = await getMeal(props.meal)
			const newImage = getImageSource(newMeal)
			setMeal(newMeal)
			setImage(newImage)
		}
		fetchData().catch(console.error)
	})
	if (meal == null) {
		return <></>
	}
	return <View style={styles.hstack}>
		<BetterImage source={image} style={styles.listimage} />
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

export function getRestrictionIcons(restrictions: DietaryRestriction[]): string[] {
	return restrictions.map((item) => ("https://menu.dining.ucla.edu/Content/Images/WebCodes/128px/" + item + ".png"))
}

export function TagsView(props: RestrictionTagsProps) {
	return <FlatList data={getRestrictionIcons(props.restrictions)} horizontal={true} renderItem={({ item }) =>
		<BetterImage style={styles.tagimage} source={{ uri: item }} />
	} />
}
