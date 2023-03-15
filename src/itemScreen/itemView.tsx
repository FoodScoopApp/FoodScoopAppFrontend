import React from 'react';
import { 
    useEffect, 
    useState 
} from 'react';
import {
    DietaryRestriction,
    Meal,
    MealID,
} from "../dataconnection/FoodScoopAppTypes/models";
import { 
    FlatList, 
    Text, 
    View, 
    Image, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';

export default function itemView(){
return(
    <View>
    <Image style={styles.imageView}
    source={{
        uri: 'https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1579721909133-R2KSZ8VGDGBI90DYATBK/header4.jpg',
        }}
        
      />
      <Text style={styles.descriptionView}>
        image descriptionnnn: blah blah blah blah blah;
      </Text>
    </View>
);  
}

// ****for food labels****

type RestrictionTagsProps = {
    restrictions: DietaryRestriction[];
};

export function getRestrictionIcons(
    restrictions: DietaryRestriction[]
): string[] {
    return restrictions.map(
        (item) =>
            "https://menu.dining.ucla.edu/Content/Images/WebCodes/128px/" +
            item +
            ".png"
    );
}

export function TagsView(props: RestrictionTagsProps) {
    return (
        <FlatList
            style={styles.restrictions}
            data={getRestrictionIcons(props.restrictions)}
            horizontal={true}
            renderItem={({ item }) => (
                <Image style={styles.tagimage} source={{ uri: item }} />
            )}
        />
    );
}

// ***end of the food labels thingggggg***

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionView: {
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    imageView: {
        alignSelf: 'center',
        marginTop: 10,
        width: 340, 
        height: 200,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    restrictions: {
        alignContent: "flex-start",
    },
    tagimage: {
        width: 24,
        height: 24,
        padding: 4,
        margin: 4,
        alignContent: "center",
    },
})