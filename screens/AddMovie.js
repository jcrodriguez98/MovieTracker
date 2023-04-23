import {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Constants from "expo-constants";

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

export default function AddMovie() {
    const [movieName, setMovieName] = useState(null);
    const [forceUpdate, forceUpdateId] = useForceUpdate();
  
    const add = (movieName) => {
      // check if text is empty
      if (movieName === null || movieName === "") {
        return false;
      }
  
      db.transaction(
        (tx) => {
          tx.executeSql("insert into movies (movieName, watched) values (?, 0)", [movieName]);
          tx.executeSql("select * from movies", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null,
        forceUpdate
      );
    };
  
    function useForceUpdate() {
      const [value, setValue] = useState(0);
      return [() => setValue(value + 1), value];
    }
  
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Movie Name'
          onChangeText={(movieName) => setMovieName(movieName)}
          onSubmitEditing={() => {
            add(movieName);
            setMovieName(null);
          }}
        />
        <TextInput
          placeholder='Streaming Service'
  
        />
        <Pressable>
          <Text>Add Movie</Text>
        </Pressable>
      </View>
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