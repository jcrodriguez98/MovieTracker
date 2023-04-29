import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import openDatabase from '../database/database.js';

const db = openDatabase;


export default function DetailsScreen({ navigation }) {
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