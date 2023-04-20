import {useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

function Items() {
  const [items, setItems] = useState(null);
}


export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView>
        
      </ScrollView>
      <Ionicons name='add-circle' size={24} color='green' />
      <StatusBar style="auto" />
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
});
