//ruta:  src/screens/home/Home.tsx


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import HomeCard from './components/HomeCard';
//import { useHomeData } from './hooks/useHomeData';

export default function Home() {
  //const { data, loading } = useHomeData();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio</Text>
      {/*<HomeCard />*/}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });