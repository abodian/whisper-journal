// BottomNavigator.js
import React from 'react';
import {View} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function BottomNavigator({ Home, Settings, SingleEntry }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />} // Use the custom TabBar component
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="AddEntry"
        component={SingleEntry}
        options={{
          tabBarLabel: 'Add Entry',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="plus" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cog" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
