import React from 'react';
import { View } from 'react-native';
import AnalysedEntry from '../components/Analysis';


const AnalysisScreen = ({ route }) => {
  const { diaryEntry } = route.params;

  return (
    <View>
      <AnalysedEntry diaryEntry={diaryEntry} />
    </View>
  );
};

export default AnalysisScreen;