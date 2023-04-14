import React from 'react'
import {StyleSheet, View} from 'react-native'
import { Text } from 'react-native-paper'

export default function WeeklySummary(props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Weekly Summary</Text>
      </View>
      <View>
        <Text style={styles.text}>Weekly summary will go here</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 175,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center'
  },
})