import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import openDatabase from '../database/database.js';

const db = openDatabase;

function SelectedMedia( {id} ) {
  const [details, setDetails] = useState();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from movies where id = ?;", [id],
        (_, { rows: { _array } }) => setDetails(_array)
      );
      tx.executeSql(
        "select * from movies where id = ?;", [id],
        (_, { rows }) => console.log(JSON.stringify(rows))
      );
    });
  }, [details]);

  return (
    <View style={styles.container}>
      {details.map(({ id, movieName, streamingService, mediaType, genre, watched }) => (
        <View>
          <Text style={styles.detailsText}>Name: {movieName}</Text>
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
        <SelectedMedia id={id} />
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