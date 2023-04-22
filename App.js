import {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

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

function Items() {
  const [items, setItems] = useState(null);

  return ( 
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value, itemDate }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{itemDate}:  {value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "drop table movies;"
      );
      tx.executeSql(
        "create table if not exists movies (id integer primary key not null, movieName text);"
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Items>

        </Items>
      </ScrollView>
      <Ionicons style={styles.addButton} name='add-circle' size={100} color='green' />
      <StatusBar style="auto" />
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
