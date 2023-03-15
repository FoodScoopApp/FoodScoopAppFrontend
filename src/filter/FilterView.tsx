import React, { useEffect, useState } from "react";
import { DietaryRestriction } from "../dataconnection/FoodScoopAppTypes/models";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import {
	accentColor,
	convertDietaryRestrictions,
} from "../dataconnection/FoodScoopAppTypes/converters";
import {
	dietaryRestrictionsImages,
} from "../dining-hall-list-view/MealItemView";
import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";

type RestrictionMap = DietaryRestriction[]

export type FilterViewProps = {
	calories: number,
	restrictions: RestrictionMap,
	setRestrictions: (restrictions: DietaryRestriction[]) => void,
	setCalories: (number: number) => void
}
const nStyles = StyleSheet.create({
	headerText: {
		fontSize: 25,
		fontWeight: "bold",
		marginLeft: 20,
		marginBottom: 10,
		marginTop: 40,
	},
	item: {
		flexDirection: "row",
		paddingLeft: 20,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 20,
		backgroundColor: "white",
		borderBottomColor: "lightgray",
		borderBottomWidth: 1,
		justifyContent: "space-between",
	},
	itemText: {
		fontSize: 17,
		alignSelf: "flex-start",
		flex: 1,
	},
	itemCheckbox: {
		alignSelf: "flex-end",
	},
	itemImage: {
		height: 17,
		width: 17,
		marginRight: 5,
	},
	end: {
        margin: 50,
    }
});

export function FilterView(props: FilterViewProps) {
	let [calories, setCalories] = useState<number>(props.calories)
	let [restrictions, setRestrictions] = useState(props.restrictions)

	return <>
		<ScrollView>
			<Text style={nStyles.headerText}>Dietary Restrictions</Text>
			{
				Object.entries(convertDietaryRestrictions).map((it, i) => (
					<TouchableOpacity
						key={i}
						onPress={() => {
							let newRestrictions: RestrictionMap = []
							const name = it[0] as DietaryRestriction
							if (restrictions.includes(name)) {
								newRestrictions = restrictions.filter((item) => {
									return item !== name
								})
							} else {
								newRestrictions = restrictions.concat([name])
							}
							setRestrictions(newRestrictions)
							props.setRestrictions(newRestrictions);
							props.setCalories(calories);
						}}
					>
						<View style={nStyles.item}>
							<Image
								source={
									dietaryRestrictionsImages[
									it[0] as DietaryRestriction
									]
								}
								style={nStyles.itemImage}
							/>
							<Text style={nStyles.itemText}>
								{it[1].replace("Contains", "No")}
							</Text>
							<Checkbox
								color={accentColor}
								style={nStyles.itemCheckbox}
								value={
									restrictions.includes(
										it[0] as DietaryRestriction
									)}
							></Checkbox>
						</View>
					</TouchableOpacity>
				))
			}
			<View
				style={[
					nStyles.item,
					{ marginTop: 10, flexDirection: "column" },
				]}
			>
				<Text
					style={[
						nStyles.itemText,
						{ fontWeight: "bold", marginBottom: 10 },
					]}
				>
					Calories
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Slider
						style={{ flex: 1 }}
						minimumValue={0}
						maximumValue={1500}
						minimumTrackTintColor={accentColor}
						onValueChange={(newCalories) => {
							setCalories(newCalories)
						}}
						onSlidingComplete={(val) => {
							props.setCalories(val);
						}}
						value={calories}
						step={100}
					></Slider>
					<Text
						style={{
							marginLeft: 10,
							width: 70,
							textAlign: "right",
						}}
					>
						{!calories ||
							calories === 0
							? "0 (no limit)"
							: calories}{" "}
						cals
					</Text>
				</View>
			</View>
			<View style={nStyles.end} />
		</ScrollView>
	</>
}
