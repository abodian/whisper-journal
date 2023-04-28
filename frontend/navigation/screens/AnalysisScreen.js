import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Title } from 'react-native-paper';
import AnalysedEntry from '../../core/Analysis';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useNavigation } from "@react-navigation/native";
import Background from '../../components/Background'


const AnalysisScreen = ({ route }) => {
  // const { title, diaryEntry } = {title: 'This is a test title', diaryEntry: 'This is a test diary entry'};
  const { title, diaryEntry, userId } = route.params;
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('Home')
  }

  return (
    <Background>
      <View style={styles.container}>
      <TouchableOpacity onPress={handleGoHome} style={styles.backContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/arrow_back.png')}
        />
      </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Title style={styles.pageTitle}>Diary Entry Analysis</Title>
          <Title style={styles.entryTitle}>{title}</Title>
        </View>
        <ScrollView style={styles.entryTextContainer}>
          <Title style={{textAlign: 'center', paddingTop: 10, fontSize: 20}}>Your Diary Entry</Title>
          <Text style={{textAlign: 'center', marginTop: 20}}>{diaryEntry}</Text>
        </ScrollView>
        <ScrollView style={styles.analysisContainer}>
          <AnalysedEntry diaryEntry={diaryEntry} userId={userId}/>
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40
  },
  pageTitle: {
    alignSelf: 'center',
    paddingTop: 0,
    fontSize: 25
  },
  entryTitle: {
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    width: 330,
    height: 40,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 40
  },
  entryTextContainer: {
    flex: 2,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    width: 330,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10
  },
  analysisContainer: {
    flex: 2,
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    width: 330,
    height: 40,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 40,
    marginBottom: 20
  },
  backContainer: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default AnalysisScreen;