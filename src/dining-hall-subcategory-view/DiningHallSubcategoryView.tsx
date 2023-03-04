import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DiningHall, DiningHallName, MealID, MealPeriod } from '../dataconnection/FoodScoopAppTypes/models';
import { TagsView } from '../dining-hall-list-view/MealItemView';
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
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Text>test</Text>
			),
		});
	})
	return <>
		<FlatList data={[1, 2, 3]} renderItem={() =>
			<View style={styles.hstack}>
				<Image
					source={{ uri: 'https://menu.dining.ucla.edu/Content/Images/RecipeImages/301001.jpg' }}
					style={styles.listimage}
				/>
				<View style={styles.vstack}>
					<Text>Classic noodles made of semolina and durum wheat tossed in a rich, marinara tomato sauce served with house-made Italian meatballs.</Text>
					<TagsView restrictions={['AWHT', "AGTN", "ASOY", "AMLK", "AEGG", "HC"]} />
				</View>
				<Ionicons name={"star-outline"} size={30} color="black" />
			</View>
		} />
	</>
}
