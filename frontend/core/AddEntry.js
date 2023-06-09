import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";

const AddEntry = ({ selectedDate, transcription }) => {
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDiaryEntryFocused, setIsDiaryEntryFocused] = useState(false);
    const [title, setTitle] = useState('');
    const [diaryEntry, setDiaryEntry] = useState(transcription || '');
    const navigation = useNavigation();
    const auth = getAuth();
    const user = auth.currentUser;
    // console.log('user', user)
    

    useEffect(() => {
      setDiaryEntry(transcription || '');
  }, [transcription]);


    const handleAddEntry = () => {
    navigation.navigate('AnalysisScreen', { title: title, diaryEntry: diaryEntry, userId: user.uid });
    const data = {
        _id: `${user.uid}_${selectedDate}`,
        title: title,
        diaryEntry: diaryEntry,
        date: selectedDate,
        userId: user.uid
    };
// 192.168.1.197 //mike whisper-journal1.onrender.com
    // fetch('http://192.168.0.106:3001/entry', { // alex
    fetch('https://whisper-journal1.onrender.com/entry', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        // handle successful response from server
        console.log('Entry created successfully!');
        setTitle('');
        setIsDiaryEntryFocused('');
        navigation.navigate('AnalysisScreen', { title: title, diaryEntry: diaryEntry, userId: user.uid });
    })
    .catch((error) => {
      if (error.code === E11000) {
          console.log('Error creating entry: You have already created an entry for this day.');
      } else {
          console.log('Error creating entry.');
          console.error(error);
      }
  });

  //API end point to summarise the entry 
  fetch('https://whisper-journal1.onrender.com/summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({diaryEntry: diaryEntry, userId: user.uid, date: selectedDate}),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("summary:", data)
    console.log('entry summarised successfully');
  })
  .catch((error) => {
    console.log("error", error)
  })
};

    return (
    <View>
        <TextInput
          style={[styles.title, { borderColor: isTitleFocused ? 'blue' : 'gray' }]}
          placeholder="Type Your Title Here"
          value={title}
          onChangeText={(text) => setTitle(text)}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
        />
        <TextInput
        style={[styles.diaryEntry, { borderColor: isDiaryEntryFocused ? 'blue' : 'gray' }]}
          placeholder="Your Diary Entry"
          value={diaryEntry}
          onChangeText={(text) => setDiaryEntry(text)}
          onFocus={() => setIsDiaryEntryFocused(true)}
          onBlur={() => setIsDiaryEntryFocused(false)}
          multiline={true}  
        />
        <View style={styles.buttonContainer}>
          <Button title="Add Entry" onPress={handleAddEntry} />
        </View>

      </View>
);
}
const styles = StyleSheet.create({
    title: {
      marginTop: 30,
      borderWidth: 0.5,
      borderRadius: 10,
      width: 300,
      height: 40,
      textAlign: 'center',
      alignSelf: 'center'
    },
    diaryEntry: {
      marginTop: 20,
      marginBottom: 20,
      borderWidth: 0.5,
      borderRadius: 10,
      width: 330,
      height: 300,
      textAlign: 'center',
    },
    buttonContainer: {
      borderRadius: 20,
      overflow: 'hidden',
    }
});


export default AddEntry;
