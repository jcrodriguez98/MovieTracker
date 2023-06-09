import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './screens/HomeScreen.js';
import AddTitle from './screens/AddTitle.js';

import openDatabase from './database/database.js';
import DetailsScreen from './screens/Details.js';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const db = openDatabase;

const Stack = createNativeStackNavigator();

export default function App() {
  const [bool, setBool] = useState(0);

  // create table (if it doesn't already exist) to store movie/show data 
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "--drop table if exists movies;"
      );
      tx.executeSql(
        "create table if not exists movies (id INTEGER primary key not null, title text, streamingService text, mediaType text, genre text, watched int);"
      );
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "delete from movies where title in ('Harry Potter and the Chamber of Secrets', 'The Office');"
      );
      tx.executeSql(
        "insert into movies (title, streamingService, mediaType, genre, watched) values" + 
        "('Harry Potter and the Chamber of Secrets', 'HBO Max', 'Movie', 'Fantasy/Adventure', 0)," +
        "('The Office', 'Peacock', 'TV Show', 'Comedy', 0);"
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
        <Stack.Screen name="Add Title" component={AddTitle} />
        <Stack.Screen name="Details" component={DetailsScreen} />
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
