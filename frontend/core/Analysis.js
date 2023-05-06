import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const AnalysedEntry = ({ diaryEntry, userId }) => {
  console.log('diaryEntry first:', diaryEntry)
  console.log('userId:', userId)
  const [analysis, setAnalysis] = useState('Loading analysis...');
  const [category, setCategory] = useState('sentiment');
  const [relevantAnalysis, setRelevantAnalysis] = useState('');

  useEffect(() => {
    const fetchData = () => {
      setAnalysis('Loading analysis...'); 
      fetch('https://whisper-journal1.onrender.com/analyse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: diaryEntry, userId: userId }),
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
  }, [diaryEntry]);

  useEffect(() => {
    const lines = analysis.split('\n');
    let relevantLines = [];
    let relevantHeading = '';
  
    switch (category) {
      case 'sentiment':
        relevantHeading = 'Sentiment Analysis:';
        break;
      case 'feedback':
        relevantHeading = 'Personalised Feedback:';
        break;
      case 'recommendations':
        relevantHeading = 'Recommendations for Improvement:';
        break;
      case 'habits':
        relevantHeading = 'Atomic Habits:';
        break;
      default:
        break;
    }
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith(relevantHeading)) {
        let firstLine = true; // add this line
        relevantLines.push(line.substring(relevantHeading.length));
        i++;
        while (i < lines.length && !lines[i].startsWith('- ')) {
          if (!firstLine || lines[i].trim() !== '') { // modify this line
            relevantLines.push(lines[i]);
          }
          if (i < lines.length - 1 && (lines[i + 1].startsWith('Sentiment Analysis:')
            || lines[i + 1].startsWith('Mood Analysis:')
            || lines[i + 1].startsWith('Personalised Feedback:')
            || lines[i + 1].startsWith('Recommendations for Improvement:')
            || lines[i + 1].startsWith('Atomic Habits:'))) {
            break;
          }
          i++;
          firstLine = false; // add this line
        }
        break;
      }
    }
    
  
    setRelevantAnalysis(relevantLines.join('\n'));
  }, [category, analysis]);
  
  

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
          dropdownIconColor="#d3d3d3"
        >
          <Picker.Item label="Sentiment" value="sentiment" />
          <Picker.Item label="Feedback" value="feedback" />
          <Picker.Item label="Ideas" value="recommendations" />
          <Picker.Item label="Atomic Habits" value="habits" />
        </Picker>
      </View>
      {analysis === 'Loading analysis...'
        ? <Text style={styles.container}>Loading analysis...</Text>
        : <Text style={styles.container}>{relevantAnalysis}</Text>
      }
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
    // lineHeight: 20,
    marginBottom: 5,
    fontSize: 20,
    color: '#6096B4',
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
    borderRadius: 60,
    marginTop: 10,
    // marginBottom: 10
  }
});

export default AnalysedEntry;
