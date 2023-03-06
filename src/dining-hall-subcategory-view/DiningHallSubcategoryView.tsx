import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal, Subcategory } from '../dataconnection/FoodScoopAppTypes/models';
import { getImageSource, TagsView } from '../dining-hall-list-view/MealItemView';
import { getMealAgg } from '../dataconnection/serverMethods';
import { Ionicons } from '@expo/vector-icons';
import BetterImage from '../dataconnection/BetterImage';

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
})

export default function DiningHallSubcategoryView({ route, navigation }: { route: any, navigation: any }) {
	const [meals, setMeals] = useState<Meal[]>([])
	const subcategory = route.params.subcategory as Subcategory
	useEffect(() => {
		navigation.setOptions({
			title: subcategory.name
		});
		const fetchData = async () => {
			const newMeals = await getMealAgg(subcategory.meals)
			setMeals(newMeals)
		}
		fetchData().catch(console.error)
	})
	return <>
		<FlatList data={meals} renderItem={(meal) =>
			<SubcategoryMealView meal={meal.item}/>
		} />
	</>
}

async function onFavorite() {
}

type SubcategoryMealProps = {
	meal: Meal
}

export function SubcategoryMealView(props: SubcategoryMealProps) {
	return <View style={styles.hstack}>
		<BetterImage
			source={getImageSource(props.meal)}
			style={styles.listimage} />
		<View style={styles.vstack}>
			<Text>{props.meal.description}</Text>
			<TagsView restrictions={props.meal.dietaryRestrictions} />
		</View>
		<TouchableOpacity onPress={async () => {
			await onFavorite()
		}}>
			<Ionicons name={"star-outline"} size={30} color="black" />
		</TouchableOpacity>
	</View>
}
