import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
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
          <Text style={styles.title}>Title: {movieName}</Text>
          <Text style={styles.detailsText}>Type: {mediaType}</Text>
          <Text style={styles.detailsText}>Where: {streamingService}</Text>
          <Text style={styles.detailsText}>Genre: {genre}</Text>
          <Text style={styles.detailsText}>Watched: {watched}</Text>

          <Text style={styles.link} onPress={() => Linking.openURL('https://www.imdb.com/find/?q=' + movieName)}>Find on IMDb</Text>
        </View>
      ))}
    </View>
  )
}

export default function DetailsScreen( {route} ) {
    const { id } = route.params;

    return (
      <View style={styles.container}>
        <Items id={id} />
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
    detailsText: {
      fontSize: 30,
      padding: 10
    },
    title: {
      fontSize: 40,
      color: '#000',
      paddingBottom: 50,
    },
    link: {
      color: 'blue',
      fontSize: 30,
      padding: 10
    },
  });