import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavigator from '../components/BottomNavigation'
import EntryCalendar from '../components/Calendar';
import WeeklySummary from '../components/WeeklySummary';
import SelectedDaySummary from '../components/SelectedDaySummary';
import SettingsScreen from './SettingsScreen';

export default function Dashboard({ navigation }) {
  return (
    <BottomNavigator Home={Home} Settings={Settings}/>
  )  
}

function Home() {
  const navigation = useNavigation();

  function handleDayPress(day) {
    navigation.navigate('SingleEntry', { date: day.dateString });
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
        <EntryCalendar onDayPress={handleDayPress} />
        </View>
        <View style={styles.summaryContainer}>
          <WeeklySummary style={styles.weeklyContainer}/>
          <SelectedDaySummary styles={styles.selectedDayContainer}/>
        </View>
      </View>
    </ScrollView>
  );
}

function Settings() {
  return (
    <SettingsScreen />
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
    padding: 20,
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
