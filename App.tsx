import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { checkUserExists } from './src/dataconnection/serverMethods';
import AppNavigator from "./src/navigation/AppNavigator";
import SyncStorage from 'sync-storage';

export const APIURL = __DEV__
  ? "http://169.232.81.115:8080/api/v1/"
  : "https://foodscoopapp.com/api/v1/";

export default function App() {
  useEffect(() => {
    SyncStorage.init();
    checkUserExists("ea_do@icloud.com").then(exists => {
      console.log(exists)
    });
  })
  return (
    <AppNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
