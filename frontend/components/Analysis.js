import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const AnalysedEntry = ({ diaryEntry }) => {
  console.log('diaryEntry first:', diaryEntry)
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/analyse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {prompt: diaryEntry} ),
        });
        console.log('diaryEntry second :', diaryEntry)
       
        const data = await response.text();
         console.log('data', data)
        // console.log('response', response)
        setAnalysis(data.completion);
        // console.log('analysis',analysis)
      } catch (error) {
        console.error(error);
      }
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