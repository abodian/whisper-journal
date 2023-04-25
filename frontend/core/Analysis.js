import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';


const AnalysedEntry = ({ diaryEntry, userId }) => {
  const [analysis, setAnalysis] = useState('Loading analysis...');
  console.log('user', userId)

  useEffect(() => {
    const fetchData = async () => {
      setAnalysis('Loading analysis...');
  
      try {
        // Send request to server to get analysis result
        const response = await fetch('https://whisper-journal1.onrender.com/analyse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: diaryEntry, userId: userId }),
        });
  
        const data = await response.json();
  
        // Store analysis result in the Analysis collection only if the userId is available
        if (userId) {

          setAnalysis(data.analysis);
        }
  
        
      } catch (error) {
        console.error(error);
        setAnalysis('Error fetching data'); // set error message on catch
      }
    };
  
    fetchData();
  }, [diaryEntry, userId]);

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
