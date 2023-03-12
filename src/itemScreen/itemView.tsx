import React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function itemView(){
return(
    <View>
    <Image
    source={{
        uri: 'https://images.squarespace-cdn.com/content/v1/57879a6cbebafb879f256735/1579721909133-R2KSZ8VGDGBI90DYATBK/header4.jpg',
        }}
        style={{
            alignSelf: 'center',
            width: 300, 
            height: 200,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
        }}
      />
    </View>
);

}


const styles = StyleSheet.create({




})