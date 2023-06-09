import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { format } from 'date-fns';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import SingleEntry from './screens/SingleEntry'
import AnalysisScreen from './screens/AnalysisScreen'


const homeName = 'Home';
const settingsName = 'Settings'
const addEntryName = 'Add Entry'
const analysisName = 'Analysis'

const Tab = createBottomTabNavigator();
const currentDate = format(new Date(), 'MM-dd-yyyy');

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
        } else if (rn === analysisName) {
          iconName = focused ? 'add' : 'add-outline';
        } 
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
      <Tab.Screen name={homeName} component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name={addEntryName} component={SingleEntry} options={{ headerShown: false, tabBarVisible: false }}   initialParams={{ date: currentDate }}  />
      <Tab.Screen name={settingsName} component={SettingsScreen} options={{ headerShown: false }} />
      {/* <Tab.Screen name={analysisName} component={AnalysisScreen} options={{ headerShown: false }} /> */}
    </Tab.Navigator>
  )  
}

export default MainContainer;

