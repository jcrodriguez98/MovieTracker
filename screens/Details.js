import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import openDatabase from '../database/database.js';

const db = openDatabase;

function GetItem( {movieID} ) { 
const [ID, setID] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from movies where id = ?;", [ID],
        (_, { rows: { _array } }) => setID(_array)
      );
    });
  }, [ID]);
}

export default function DetailsScreen() {
    return (
      <View style={styles.container}>
        <ScrollView>
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