// src/navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Turnos from '../screens/turnos/Turnos';
//import Consultas from '../screens/consultas/Consultas';
import Perfil from '../screens/perfil/Perfil';
import Consultas from '../screens/consultas/Consultas';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Turnos" component={Turnos} />
      <Tab.Screen name="Consultas" component={Consultas} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}


