import React from 'react';
import { View } from 'react-native';
import AnalysedEntry from '../components/AnalysedEntry';


const AnalysedScreen = ({ route }) => {
  const { input } = route.params;

  return (
    <View>
      <AnalysedEntry input={input} />
    </View>
  );
};

export default AnalysedScreen;