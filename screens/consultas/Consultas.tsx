// src/screens/consultas/Consultas.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import ConsultaCard from './components/ConsultaCard';
//import { useConsultas } from './hooks/useConsultas';

export default function Consultas() {
  //const { consultas, loading } = useConsultas();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas</Text>
      {/* <ConsultaCard />*/}
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