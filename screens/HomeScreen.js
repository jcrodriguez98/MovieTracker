import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import openDatabase from '../database/database.js';

const db = openDatabase;

function Items() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from movies;", [],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, [items]);

  if (items === null || items.length === 0) {
    return (
      <View style={styles.Container}>
        <Text style={styles.text}>Add a Movie or TV Show!</Text>
      </View>
    );

  }

  return (
    <View style={styles.sectionContainer}>
      {items.map(({ id, movieName, streamingService, mediaType, watched }) => (
        <TouchableOpacity
          key={id} 
          style={styles.details}>
          <Text style={styles.detailsText}>Name: {movieName}</Text>
          <Text style={styles.detailsText}>Type: {mediaType}</Text>
          <Text style={styles.detailsText}>Where: {streamingService}</Text>
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
    padding: 20,
  },
  sectionContainer: {
    marginTop: 30,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  details: {
    borderColor: "#000",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 100,
    paddingLeft: 100,
  },
  detailsText: {
    fontSize: 20
  },
  text: {
    fontSize: 30,
    color: 'gray',
    paddingTop: 50,
  }
});