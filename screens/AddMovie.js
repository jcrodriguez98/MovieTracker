import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import openDatabase from '../database/database.js';

const filmLogo = require("../assets/film.png");

const db = openDatabase;

export default function AddMovie() {
  const [movieName, setMovieName] = useState(null);
  const [streamingService, setStreamingService] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [genre, setGenre] = useState(null);

  const validateEntries = (movieName, streamingService, mediaType, genre) => {
    let bool = true;

    // check if text is empty
    if (movieName === null || movieName === "") {
      bool = false;
      Alert.alert("Error", 'Title is a required field.', [{text: 'OK'}]);
    }
    else if (streamingService === null || streamingService === "") {
      bool = false;
      Alert.alert("Error", 'Streaming Service is a required field.', [{text: 'OK'}]);
    }
    else if (mediaType === null || mediaType === "") {
      bool = false;
      Alert.alert("Error", 'Type is a required field.', [{text: 'OK'}]);
    }
    else if (genre === null || genre === "") {
      bool = false;
      Alert.alert("Error", 'Genre is a required field.', [{text: 'OK'}]);
    }

    return bool;

  }

  const insertRecord = (movieName, streamingService, mediaType, genre) => {
  
      db.transaction(
        (tx) => {
          tx.executeSql("insert into movies (movieName, streamingService, mediaType, genre, watched) values (?, ?, ?, ?, 0);", [movieName, streamingService, mediaType, genre]);
          tx.executeSql("select * from movies;", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null,
      );
  };

  const add = (movieName, streamingService, mediaType, genre) => {

    let bool = validateEntries(movieName, streamingService, mediaType, genre);

    if (bool) {
      insertRecord(movieName, streamingService, mediaType, genre);
      setMovieName(null);
      setStreamingService(null);
      setMediaType(null);
      setGenre(null);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='TV/Movie Name'
        onChangeText={text => setMovieName(text)}
        style={styles.input}
        value={movieName}
      />
      <TextInput
        placeholder='Streaming Service'
        onChangeText={text => setStreamingService(text)}
        style={styles.input}
        value={streamingService}
      />
      <TextInput
        placeholder='Type (TV/Movie)'
        onChangeText={text => setMediaType(text)}
        style={styles.input}
        value={mediaType}
      />
      <TextInput 
        placeholder='Genre'
        onChangeText={text => setGenre(text)}
        style={styles.input}
        value={genre}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          add(movieName, streamingService, mediaType, genre);
        }}
      >
        <Text style={styles.buttonText}>Add Movie</Text>
      </Pressable>
      <Image source={filmLogo} style={styles.image} />
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
  input: {
    height: 60,
    width: 300,
    borderWidth: 1, 
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    height: 60,
    width: 250,
    borderWidth: 1, 
    padding: 10,
    backgroundColor: 'grey',
    margin: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
  image: {
    height: 375,
    width: 350,
  },
});