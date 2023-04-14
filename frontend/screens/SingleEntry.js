import { useRoute } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { Text } from 'react-native';


function SingleEntry() {
    const route = useRoute();
    const { date } = route.params;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    const [selectedDate, setSelectedDate] = useState(date);

  return (
    <View style={styles.container}>
        <Text >You are adding an entry for {formattedDate}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
})


export default SingleEntry;