import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const AnalysedEntry = ({ diaryEntry }) => {
  console.log('diaryEntry first:', diaryEntry)
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const fetchData = () => {
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
        });
    };
  
    fetchData();
  }, [diaryEntry]);


  return (
    <View>
      <Text>{analysis}</Text>
    </View>
  );
};

export default AnalysedEntry;