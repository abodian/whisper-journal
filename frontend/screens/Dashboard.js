// Screen after login
import React from 'react'
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // mike
import { Text, BottomNavigation } from 'react-native-paper';
import BottomNavigator from '../components/BottomNavigation'
import EntryCalendar from '../components/Calendar';

export default function Dashboard({ navigation }) {
  return (
    <BottomNavigator HomeScreen={HomeScreen} SettingsScreen={SettingsScreen}/>
  )  
}

function HomeScreen() {
  const navigation = useNavigation();

  function handleDayPress(day) {
    navigation.navigate('SingleEntry', { date: day.dateString });
  }

  return (
    <View style={styles.calendarContainer}>
      <EntryCalendar onDayPress={handleDayPress} />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Settings!</Text>
    </View>
  );
}

function LogOut (navigation) {
  return (
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
});