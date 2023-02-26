import React from 'react';
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
	},
	image: {
		width: 120,
		height: 120,
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
	return <>
		<FlatList data={[1, 2, 3]} renderItem={({ item }) =>
			<View
				style={styles.cell}>
				<Text style={styles.subcategoryName}>Subcategory</Text>
				<FlatList data={[1, 1, 1, 1, 1, 1, 1, 1]} horizontal={true} renderItem={({ item }) =>
					<View style={styles.vstack}>
						<Image
							source={require("../../assets/logo.png")}
							style={styles.image}
						/>
						<Text>Test</Text>
					</View>
				} />
			</View>
		} />
	</>
}
