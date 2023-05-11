import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import EntryCalendar from '../../components/Calendar';
import WeeklySummary from '../../components/WeeklySummary';
import SelectedDaySummary from '../../core/SelectedDaySummary';
import BackgroundHomeScreen from '../../components/BackgroundHomeScreen';
import { useNavigation } from '@react-navigation/native';
import { format, isSameDay, parseISO } from 'date-fns';

const HomeScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayPress = (day) => {
    setSelectedDate(parseISO(day.dateString));
  };

  useEffect(() => {
    if (!isSameDay(selectedDate, new Date())) {
      setSelectedDate(new Date());
    }
  }, []);

  const formattedSelectedDate = format(selectedDate, 'MM-dd-yyyy');
  console.log('selected date home', formattedSelectedDate);

  return (
    <BackgroundHomeScreen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.calendarContainer}>
            <EntryCalendar onDayPress={handleDayPress} />
          </View>

          <View style={styles.summaryContainer}>
            <WeeklySummary style={styles.weeklyContainer} />
            <SelectedDaySummary selectedDate={formattedSelectedDate} style={styles.selectedDayContainer} />
          </View>
        </View>
      </ScrollView>
    </BackgroundHomeScreen>
  );
};


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