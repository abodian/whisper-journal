import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

const AnalysedEntry = ({ diaryEntry }) => {
  const [analysis, setAnalysis] = useState('Loading analysis...');
  const [category, setCategory] = useState('sentiment');

  useEffect(() => {
    const fetchData = () => {
      setAnalysis('Loading analysis...'); 
      fetch('https://whisper-journal1.onrender.com/analyse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: diaryEntry, category }),
      })
        .then(response => response.json())
        .then(data => {
          setAnalysis(data.analysis);
        })
        .catch(error => {
          console.error(error);
          setAnalysis('Error fetching data');
        });
    };

    fetchData();
  }, [diaryEntry, category]);

  const handleCategoryChange = value => {
    setCategory(value);
  };

  return (
    <View>
      <Title style={styles.title}>Your Diary Entry Analysis</Title>
      <View style={styles.pickerView}>
        <Picker
          selectedValue={category}
          onValueChange={handleCategoryChange}
          style={styles.picker}
          dropdownIconColor='#d3d3d3'
        >
          <Picker.Item label="Sentiment" value="sentiment" />
          <Picker.Item label="Feedback" value="feedback" />
          <Picker.Item label="Ideas" value="recommendations" />
          <Picker.Item label="Atomic Habits" value="habits" />
        </Picker>
      </View>
      <Text style={styles.container}>{analysis}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 5,
    alignSelf: 'center',
    width: 330,
    height: 30,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 40,
    marginBottom: 5,
    fontSize: 20,
    color: '#6096B4'
  },
  container: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    paddingBottom: 20,
    color: '#d3d3d3'
  },
  picker: {
    height: 50,
    width: 200,
    alignSelf: 'center',
    marginBottom: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#d3d3d3'
  },
  pickerView: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 210,
    alignSelf: 'center',
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10
  }
});

export default AnalysedEntry;
