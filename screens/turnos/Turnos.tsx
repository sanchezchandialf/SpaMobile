// src/screens/turnos/Turnos.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import TurnoCard from './components/TurnoCard';
//import { useTurnos } from './hooks/useTurnos';

export default function Turnos() {
  //const { turnos, loading } = useTurnos();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Turnos</Text>
      {/*<TurnoCard />*/}
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