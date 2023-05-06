import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Title } from 'react-native-paper';
import AnalysedEntry from '../../core/Analysis';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useNavigation } from "@react-navigation/native";
import BackgroundAnalysisScreen from '../../components/BackgroundAnalysisScreen'
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height


const AnalysisScreen = ({ route }) => {
  const { title, diaryEntry } = {title: 'This is a test title', diaryEntry: 'This is a test diary entry'};
  // const { title, diaryEntry, userId } = route.params;
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate('Home')
  }

  return (
    <BackgroundAnalysisScreen>
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
        <View style={{ flex: 1, width: '100%' }}>
        <ScrollView style={styles.entryTextContainer}>
          <Title style={{ textAlign: 'center', paddingTop: 10, fontSize: 20, color: '#6096B4' }}>Your Diary Entry</Title>
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#d3d3d3' }}>{diaryEntry}</Text>
        </ScrollView>
        <ScrollView style={styles.analysisContainer}>
          <AnalysedEntry diaryEntry={diaryEntry} />
          {/* <AnalysedEntry diaryEntry={diaryEntry} userId={userId}/> */}
        </ScrollView>
        </View>
      </View>
    </BackgroundAnalysisScreen>
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
    fontSize: 25,
    color: '#6096B4'
  },
  entryTitle: {
    marginTop: 5,
    alignSelf: 'center',
    width: 330,
    height: 50,
    textAlign: 'center',
    fontSize: 15,
    color: '#d3d3d3'
  },
  entryTextContainer: {
    alignSelf: 'center',
    borderWidth: 2.0,
    borderRadius: 10,
    borderStyle: 'inset',
    borderColor: '#d3d3d3', // Light gray
    width: 330,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
    height: windowHeight * 0.4 // Change this value
  },
  analysisContainer: {
    alignSelf: 'center',
    width: 330,
    marginBottom: 20,
    height: windowHeight * 0.6 // Change this value
  },
  backContainer: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 1,
    zIndex: 1,
  },
  image: {
    width: 24,
    height: 24,
  },
});



export default AnalysisScreen;