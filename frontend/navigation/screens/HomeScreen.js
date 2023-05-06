import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import EntryCalendar from '../../components/Calendar';
import WeeklySummary from '../../components/WeeklySummary';
import SelectedDaySummary from '../../components/SelectedDaySummary';
import BackgroundHomeScreen from '../../components/BackgroundHomeScreen'
import { useNavigation } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {
  const handleDayPress = (day) => {
    navigation.navigate('SingleEntry', { date: day.dateString });
  }
  
  return (
    <BackgroundHomeScreen>
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
    </BackgroundHomeScreen>
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


export default HomeScreen