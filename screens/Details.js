import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import openDatabase from '../database/database.js';

const db = openDatabase;

function Items( {id} ) {
  let array = [];
  const [items, setItems] = useState(array);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from movies where id = ?;", [id],
        (_, { rows: { _array } }) => setItems(_array)
      );
      tx.executeSql(
        "select * from movies where id = ?;", [id],
        (_, { rows }) => console.log(JSON.stringify(rows))
      );
    });
  }, []);

  if (items === null || items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Fetching data...</Text>
      </View>
    );
  }

  return (
    <View>
      {items.map(({ id, movieName, streamingService, mediaType, genre, watched }) => (
        <View key={(id)}>
          <Text style={styles.detailsText}>Title: {movieName}</Text>
          <Text style={styles.detailsText}>Type: {mediaType}</Text>
          <Text style={styles.detailsText}>Where: {streamingService}</Text>
          <Text style={styles.detailsText}>Genre: {genre}</Text>
          <Text style={styles.detailsText}>Watched: {watched}</Text>
        </View>
      ))}
    </View>
  )
}

export default function DetailsScreen( {route} ) {
    const { id } = route.params;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Items id={id}>
          </Items>
        </ScrollView>
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