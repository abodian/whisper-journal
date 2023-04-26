import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import SingleEntry from './screens/SingleEntry'



const homeName = 'Home';
const settingsName = 'Settings'
const addEntryName = 'Add Entry'

const Tab = createBottomTabNavigator();


const MainContainer = () => {
  return (
    <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;
        if (rn === homeName) {
          iconName = focused ? 'home' : 'home-outline';
        } else if (rn === settingsName) {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (rn === addEntryName) {
          iconName = focused ? 'add' : 'add-outline';
        } 
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name={addEntryName} component={SingleEntry} options={{ headerShown: false }} />
      <Tab.Screen name={settingsName} component={SettingsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )  
}

export default MainContainer;

