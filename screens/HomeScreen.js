import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import openDatabase from '../database/database.js';

const db = openDatabase;

function Items() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      console.log("selecting movies");
      tx.executeSql(
        `select * from movies where watched = 0;`,
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    console.log("items is null")
    return null;
  }

  return (
    <View >
      <Text>Jurassic Park</Text>
      {items.map(({ id, movieName, watched }) => (
        <TouchableOpacity>
          <Text style={{ color: watched ? "#fff" : "#000" }}>{id} {movieName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Items>

        </Items>
      </ScrollView>
      <Ionicons style={styles.addButton} name='add-circle' size={100} color='green' onPress={() => { navigation.navigate('Add Movie') }} />
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