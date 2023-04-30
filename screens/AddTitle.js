import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert} from 'react-native';
import openDatabase from '../database/database.js';

const filmLogo = require("../assets/film.png");

const db = openDatabase;

export default function AddTitle() {
  const [title, setTitle] = useState(null);
  const [streamingService, setStreamingService] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [genre, setGenre] = useState(null);

  const validateEntries = (title, streamingService, mediaType, genre) => {
    let bool = true;

    // check if text is empty
    if (title === null || title === "") {
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

  };

  const insertRecord = (title, streamingService, mediaType, genre) => {
  
      db.transaction(
        (tx) => {
          tx.executeSql("insert into movies (title, streamingService, mediaType, genre, watched) values (?, ?, ?, ?, 0);", [title, streamingService, mediaType, genre]);
          tx.executeSql("select * from movies;", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null,
      );
  };

  const add = (title, streamingService, mediaType, genre) => {

    let bool = validateEntries(title, streamingService, mediaType, genre);

    if (bool) {
      insertRecord(title, streamingService, mediaType, genre);
      setTitle(null);
      setStreamingService(null);
      setMediaType(null);
      setGenre(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Title'
        onChangeText={text => setTitle(text)}
        style={styles.input}
        value={title}
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
          add(title, streamingService, mediaType, genre);
        }}
      >
        <Text style={styles.buttonText}>Add Title</Text>
      </Pressable>
      <Image source={filmLogo} style={styles.image} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfcdb4',
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
    height: 275,
    width: 260,
  },
});