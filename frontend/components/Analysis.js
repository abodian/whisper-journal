import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const AnalysedEntry = ({ input }) => {
  console.log('Input first:', input)
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://whisper-journal1.onrender.com/analyse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {prompt: input} ),
        });
          console.log('Input second :', input)
        const data = await response.json();
        setAnalysis(data.completion);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [input]);

  return (
    <View>
      <Text>{analysis}</Text>
    </View>
  );
};

export default AnalysedEntry;