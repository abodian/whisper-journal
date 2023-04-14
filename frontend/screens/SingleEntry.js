import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import React, {useState} from 'react';
import FormattedDate from '../components/Date';
import AddEntry from '../components/AddEntry';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const dateHeight = aspectRatio >= 0.75 ? height * 0.4 : height * 0.3;
const addEntryHeight = (height - dateHeight) / 2;



function SingleEntry() {
    const route = useRoute();
    const { date } = route.params;
    const [selectedDate, setSelectedDate] = useState(date);

    return (
      <View style={styles.container}>
        <View style={styles.dateComponent}>
          <Text>You are adding entry for <FormattedDate date={date} /></Text>
        </View>
        <View style={styles.entry}>
          <AddEntry selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    dateComponent: {
      height: dateHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    entry: {
      height: addEntryHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default SingleEntry;