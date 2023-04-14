import { useRoute } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { Text } from 'react-native';


function SingleEntry() {
    const route = useRoute();
    const { date } = route.params;

    const [selectedDate, setSelectedDate] = useState(date);

  return (
    <View style={styles.container}>
        <Text >todays date : {date}</Text>
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