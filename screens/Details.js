import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import openDatabase from '../database/database.js';

const db = openDatabase;

function Title( {id} ) {
  let array = [];
  const [title, setTitle] = useState(array);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from movies where id = ?;", [id],
        (_, { rows: { _array } }) => setTitle(_array)
      );
    });
  }, []);

  if (title === null || title.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Fetching data...</Text>
      </View>
    );
  }

  return (
    <View>
      {title.map(({ id, title, streamingService, mediaType, genre }) => (
        <View key={(id)}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.details}>
            <Text style={styles.detailsText}>Type: {mediaType}</Text>
            <Text style={styles.detailsText}>Where: {streamingService}</Text>
            <Text style={styles.detailsText}>Genre: {genre}</Text>
          </View>

          <Text style={styles.link} onPress={() => Linking.openURL('https://www.imdb.com/find/?q=' + title)}>Find on IMDb</Text>
        </View>
      ))}
    </View>
  )
}

export default function DetailsScreen( {route} ) {
    const { id } = route.params;

    return (
      <View style={styles.container}>
        <Title id={id} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bfcdb4',
      aligntitle: 'center',
    },
    detailsText: {
      fontSize: 30,
      padding: 5
    },
    title: {
      fontSize: 40,
      color: '#000',
      paddingTop: 10,
      paddingBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    details: {
      padding: 10,
      paddingBottom: 100,
    },
    link: {
      color: 'blue',
      fontSize: 30,
      padding: 10,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });