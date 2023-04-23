import {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from "expo-constants";

import HomeScreen from './screens/HomeScreen.js';
import AddMovie from './screens/AddMovie.js';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

const Stack = createNativeStackNavigator();

export default function App() {

  // create table (if it doesn't already exist) to store movie/show data 
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists movies (id integer primary key not null, movieName text, watched int);"
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
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
  addButton: {
    padding: 20
  }
});
