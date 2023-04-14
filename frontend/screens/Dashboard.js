import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

import BottomNavigator from '../components/BottomNavigation'
import EntryCalendar from '../components/Calendar';
import WeeklySummary from '../components/WeeklySummary';
import SelectedDaySummary from '../components/SelectedDaySummary';


export default function Dashboard({ navigation }) {
  return (
    <BottomNavigator HomeScreen={HomeScreen} SettingsScreen={SettingsScreen}/>
  )  
}

function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <EntryCalendar />
        </View>
        <View style={styles.summaryContainer}>
          <WeeklySummary style={styles.weeklyContainer}/>
          <SelectedDaySummary styles={styles.selectedDayContainer}/>
        </View>
      </View>
    </ScrollView>
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
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  calendarContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    padding: 20
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
