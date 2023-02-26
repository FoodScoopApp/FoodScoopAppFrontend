import React, { useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	cell: {

	},
	vstack: {
		flexDirection: 'column',
		alignItems: 'center',
		padding: 8,
	},
	hstack: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
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

export default function DiningHallListView() {
	const [useListView, setView] = useState(true)
	return <>
		<FlatList data={[1, 2, 3]} renderItem={({ item }) =>
			<View
				style={styles.cell}>
				<Text style={styles.subcategoryName}>Subcategory</Text>
				<Dishes listMode={useListView} />
			</View>
		} />
	</>
}

type DishProps = {
	listMode: boolean,
}

function Dishes(props: DishProps) {
	if (props.listMode) {
		return ListView()
	} else {
		return IconsView()
	}
}

function IconsView() {
	return <FlatList data={[1, 1, 1, 1, 1, 1, 1, 1]} horizontal={true} renderItem={({ item }) =>
		<View style={styles.vstack}>
			<Image
				source={require("../../assets/logo.png")}
				style={styles.iconimage}
			/>
			<Text>Test</Text>
		</View>
	} />
}

function ListView() {
	return <FlatList data={[1, 1, 1, 1, 1, 1, 1, 1]} renderItem={({ item }) =>
		<View style={styles.hstack}>
			<Image
				source={require("../../assets/logo.png")}
				style={styles.listimage}
			/>
			<View style={styles.vstack}>
				<Text>Tator Tots</Text>
				<TagsView />
			</View>
			<Text>Omar is going to hell for lying that there is tatot tots at BPlate</Text>
		</View>
	} />
}

function TagsView() {
	return <></>
}
