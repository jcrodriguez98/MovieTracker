import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import openDatabase from '../database/database.js';

const db = openDatabase;

function Items( {navigation} ) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select id, title, mediaType, genre from movies;", [],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, [items]);

  if (items === null || items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Add a movie or TV show!</Text>
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      {items.map(({ id, title, mediaType, genre }) => (
        <TouchableOpacity
          key={id} 
          style={styles.details}
          onPress={() => { navigation.navigate('Details', {id: id}) }}
        >
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.detailsText}>{mediaType}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Items navigation={navigation}>

        </Items>
      </ScrollView>
      <Ionicons style={styles.addButton} name='add-circle' size={100} color='#58ea0e' onPress={() => { navigation.navigate('Add Title') }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5f665a',
  },
  addButton: {
    padding: 20,
  },
  sectionContainer: {
    marginTop: 30,
    marginBottom: 16,
  },
  details: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 15,
    marginTop: 1,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: '#bfcdb4',
    borderRadius: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 15
  },
  text: {
    fontSize: 30,
    color: 'gray',
    paddingTop: 50,
  }
});