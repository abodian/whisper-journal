import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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
    console.log('user', user)
    

    useEffect(() => {
      setDiaryEntry(transcription || '');
  }, [transcription]);

    const handleAddEntry = () => {
    const data = {
        title: title,
        diaryEntry: diaryEntry,
        date: selectedDate,
        userId: user.uid
    };

    // fetch('http://192.168.0.106:3001/entry', {
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
        // handle error
        console.log('Error creating entry.');
        console.error(error);
    });
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
    },
});


export default AddEntry;
