import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './screens/HomeScreen.js';
import AddMovie from './screens/AddMovie.js';

import openDatabase from './database/database.js';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const db = openDatabase;

const Stack = createNativeStackNavigator();

export default function App() {

  // create table (if it doesn't already exist) to store movie/show data 
  useEffect(() => {
    console.log("creating table");
    db.transaction((tx) => {
      tx.executeSql(
        "--drop table movies;"
      );
      tx.executeSql(
        "create table if not exists movies (id INTEGER primary key not null, movieName text, streamingService text, mediaType text, watched int);"
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
					headerStyle: {
						backgroundColor: 'grey',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',																	
					}
				}}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Movie" component={AddMovie} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
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
