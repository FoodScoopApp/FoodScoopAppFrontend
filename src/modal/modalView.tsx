//import React from "react";
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet, 
  Text, 
  Pressable, 
  View, 
  Button} from 'react-native';

  //import {CheckBox} from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const initialState = {
    label1: false,
    label2: false,
    label3: false,
    label4: false,
  };

//this is the screen for the modal view
export default function modalView(){
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filters</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Save Changes</Text> 
            </Pressable>
          </View>
        </View> 
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Filters</Text>
      </Pressable>
    </View>
  );

//checkbox stuff
function Checkbox() {  
  const [state, setState] = React.useState(initialState);
  const [toggleButton, setToggleButton] = React.useState(false);
  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              value={state.label1}
              onValueChange={value =>
                setState({
                  ...state,
                  label1: value,
                })
              }
            />
            <Text>Label 1</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              value={state.label2}
              onValueChange={value =>
                setState({
                  ...state,
                  label2: value,
                })
              }
            />
            <Text>Label 2</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              value={state.label3}
              onValueChange={value =>
                setState({
                  ...state,
                  label3: value,
                })
              }
            />
            <Text>Label 3</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              value={state.label4}
              onValueChange={value =>
                setState({
                  ...state,
                  label4: value,
                })
              }
            />
            <Text>Label 4</Text>
          </View>
        </View>
        <Button
          onPress={() => setToggleButton(toggleButton => !toggleButton)}
          title="Save"
        />
      </View>
      {toggleButton && (
        <View style={styles.resultContainer}>
          {Object.entries(state).map(([key, value]) => {
            return (
              value && (
                <View key={key} style={{paddingHorizontal: 5}}>
                  <Text>{key}</Text>
                </View>
              )
            );
          })}
        </View>
      )}
    </View>
  );
}
};



// stylesheet for modal view + checkboxes
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    height: 700,
    width: 320,
    borderRadius: 20, //smoothes the edges
    padding: 35, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10, //10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#AA2622',
  },
  buttonClose: {
    backgroundColor: '#AA2622',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  resultContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8DFE2',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
});
