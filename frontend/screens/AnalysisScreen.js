import React from 'react';
import { View, StyleSheet } from 'react-native';
import AnalysedEntry from '../components/Analysis';


const AnalysisScreen = ({ route }) => {
  const { diaryEntry } = route.params;

  return (
    <View style={styles.container}>
      <AnalysedEntry diaryEntry={diaryEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnalysisScreen;