import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import openDatabase from '../database/database.js';

const db = openDatabase;

export default function AddMovie() {
  const [movieName, setMovieName] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const add = (text) => {
    // check if text is empty
    if (text === null || text === "") {
      console.log("text is null");
      return false;
    }

    db.transaction(
      (tx) => {
        console.log("insert to db");
        tx.executeSql("insert into movies (movieName, watched) values (?, 0);", [text]);
        tx.executeSql("select * from movies;", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
  }

  return (
    <View style={styles.container}>
      <Text>{movieName}</Text>
      <TextInput
        placeholder='Movie Name'
        onChangeText={text => setMovieName(text)}
      />
      <TextInput
        placeholder='Streaming Service'

      />
      <Pressable
        onPress={() => {
          add(movieName);
          setMovieName(null);
        }}
      >
        <Text>Add Movie</Text>
      </Pressable>
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