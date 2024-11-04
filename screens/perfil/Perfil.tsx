// src/screens/perfil/Perfil.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import ProfileInfo from './components/ProfileInfo';
//import { useProfile } from './hooks/useProfile';

export default function Perfil() {
  //const { profile, loading } = useProfile();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      {/*<ProfileInfo />*/}
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