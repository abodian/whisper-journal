import React, { useState } from 'react'
import { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import { getAuth } from "firebase/auth"; //for user id 

const screenWidth = Dimensions.get('window').width;
const marginRightPercentage = screenWidth < 400 ? 5 : 12; // last number adjusts how far apart the 
// two elements are

export default function SelectedDaySummary( {selectedDate} ) {
  const [summary, setSummary] = useState('');
  console.log('date', selectedDate)
  const auth = getAuth();
  const user = auth.currentUser;
  const userID = user ? user.uid : null;

  useEffect(() => {
    const fetchSummary = async () => {
      if (!userID) {
        console.log('User ID is not avaliable');
        return
      }

      const _id = `${userID}_${selectedDate}`;

      try {
        const response = await fetch(`http://192.168.1.197:3001/summary/${_id}`);

        if (response.ok) {
          const data = awaitresponse.json();
          console.log('data', data)
          setSummary(data.summary);
        } else {
          throw new Error('Error fetching data')
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }

    fetchSummary();

  }, [selectedDate, userID])

  return (
    <View style={styles.daySummary}>
      <View style={styles.header}>
        <Text style={[styles.title, { marginRight: screenWidth * marginRightPercentage / 100 }]}>Selected Day Summary</Text>
        <Text style={styles.date}>{selectedDate}</Text>
      </View>
      <View>
        <Text style={styles.text}>{summary}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  daySummary: {
    height: 175,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    color: '#6096B4'
  },
  title: {
    fontSize: 25,
    textAlign: 'left',
    color: '#6096B4'
  },
  date: {
    fontSize: 15,
    textAlign: 'right',
    color: '#6096B4'
  },
  text: {
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center',
    color: '#ffffff'
  },
})
