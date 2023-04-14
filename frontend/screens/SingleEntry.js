import { useRoute } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { Text } from 'react-native';
import FormattedDate from '../components/Date';
import AddEntry from '../components/AddEntry';
import tw from 'react-native-tailwindcss';


function SingleEntry() {
    const route = useRoute();
    const { date } = route.params;
    const [selectedDate, setSelectedDate] = useState(date);

  return (
    <View style={styles.container}>
    <View style={styles.dateComponent}> 
        <FormattedDate date={date} />
    </View>
     <View style={styles.entry}>
        <AddEntry selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateComponent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    entry: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  

export default SingleEntry;