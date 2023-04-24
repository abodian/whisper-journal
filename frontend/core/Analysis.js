import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

const AnalysedEntry = ({ diaryEntry }) => {
  console.log('diaryEntry first:', diaryEntry)
  const [analysis, setAnalysis] = useState('Loading analysis...');

  useEffect(() => {
    const fetchData = () => {
      setAnalysis('Loading analysis...'); 
      fetch('https://whisper-journal1.onrender.com/analyse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: diaryEntry }),
      })
        .then(response => response.json())
        .then(data => {
          setAnalysis(data.analysis);
        })
        .catch(error => {
          console.error(error);
          setAnalysis('Error fetching data'); // set error message on catch
        });
    };
  
    fetchData();
  }, [diaryEntry]);


  return (
    <View >
      <Title style={styles.title}>Your Diary Entry Analysis</Title>
      <Text style={styles.container}>{analysis}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 5,
    alignSelf: 'center',
    width: 330,
    height: 40,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 40,
    marginBottom: 10,
    fontSize: 20
  },
  container: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    paddingBottom: 20
  },
})

export default AnalysedEntry;
