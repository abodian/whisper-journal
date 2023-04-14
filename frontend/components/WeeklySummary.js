import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'

const screenWidth = Dimensions.get('window').width;
const marginRightPercentage = screenWidth < 400 ? 5 : 12; // last number adjusts how far apart the 
// two elements are

export default function WeeklySummary(props) {
  return (
    <View style={styles.weeklySummary}>
      <View style={styles.header}>
        <Text style={[styles.title, { marginRight: screenWidth * marginRightPercentage / 100 }]}>Weekly Summary</Text>
        <Text style={styles.date}>Date Drop Down</Text>
      </View>
      <View>
        <Text style={styles.text}>Weekly summary will go here</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  weeklySummary: {
    height: 175,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  title: {
    fontSize: 25,
    textAlign: 'left',
  },
  date: {
    fontSize: 15,
    textAlign: 'right',
  },
  text: {
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center'
  },
})
