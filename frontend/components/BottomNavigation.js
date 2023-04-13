// BottomNavigator.js
import React from 'react';
import {View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ HomeScreen, SettingsScreen }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />} // Use the custom TabBar component
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Logout"
        component={View}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="logout" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
