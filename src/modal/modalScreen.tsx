import React, {useState} from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    Button, 
    Linking, 
    SafeAreaView, 
    Modal, 
    TouchableOpacity, 
    ScrollView 
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

export default function modalScreen() {
   const [toggleCheckBox, setToggleCheckBox] = useState(false);
   const [complianceModal, setComplianceModal] = useState(true);
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.googleText}>Filters</Text>

            
            <View>
                <Modal
                animationType='slide'
                transparent ={true}
                visible={false}
                >

                </Modal>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
    },
    googleText: {
        fontSize: 18,
        marginButton:20,
    },
})