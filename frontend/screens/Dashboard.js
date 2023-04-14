import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';

import BottomNavigator from '../components/BottomNavigation'
import EntryCalendar from '../components/Calendar';
import WeeklySummary from '../components/WeeklySummary';
import SelectedDaySummary from '../components/SelectedDaySummary';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const calendarHeight = aspectRatio >= 0.75 ? height * 0.4 : height * 0.3;
const summaryHeight = (height - calendarHeight) / 2;


export default function Dashboard({ navigation }) {
  return (
    <BottomNavigator HomeScreen={HomeScreen} SettingsScreen={SettingsScreen}/>
  )  
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={[styles.calendarContainer, { height: calendarHeight }]}>
        <EntryCalendar />
      </View>
      <View style={[styles.summaryContainer, { height: summaryHeight }]}>
        <WeeklySummary style={styles.weeklyContainer}/>
        <SelectedDaySummary styles={styles.selectedDayContainer}/>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 65,
  },
  summaryContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  weeklyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectedDayContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
