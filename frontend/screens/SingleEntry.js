import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Text, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormattedDate from '../components/Date';
import AddEntry from '../core/AddEntry';
import BackButton from "../components/BackButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAudioRecording } from '../core/audioRecording';
import { Audio } from 'expo-av';
import { readFileAsBase64 } from '../logic/readFileAsBase64';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const dateHeight = aspectRatio >= 0.75 ? height * 0.4 : height * 0.3;
const addEntryHeight = (height - dateHeight) / 2;

function SingleEntry({ navigation, date: propDate }) {
  const route = useRoute();
  const routeDate = route.params && route.params.date;
  const selectedDate = propDate && propDate !== '' ? propDate : routeDate;
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, transcribeRecording } = useAudioRecording();
  const [sound, setSound] = useState(null);
  const [transcription, setTranscription] = useState([])

  // this is just for testing purposes
  async function playRecording(uri) {
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri },
      {},
      null,
      false
    );
    setSound(newSound);
    await newSound.playAsync();
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const handleMicrophonePress = async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      const uri = await stopRecording();
      if (uri) {
        console.log('Recorded audio file URI:', uri);
        playRecording(uri)
        const base64Audio = await readFileAsBase64(uri)
        const audioTranscription = await transcribeRecording(base64Audio) // await for the promise to resolve
        console.log('this is microphone function', audioTranscription)
        setTranscription(audioTranscription) // set the transcription state
      }
    }
    setIsRecording(!isRecording);
    console.log('setTranscription', transcription)
  };


  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <BackButton goBack={navigation.goBack} />
      <View style={styles.userInputContainer}>
        <Text
          style={{
            borderWidth: 0.5,
            borderColor: 'gray',
            padding: 15,
            borderRadius: 10,
            marginTop: 60,
            marginBottom: 20,
          }}
        >
          You are adding entry for <FormattedDate date={selectedDate} />
        </Text>
        <Text>Press the microphone button to add your entry!</Text>
        <AddEntry selectedDate={selectedDate} transcription={transcription} />
      </View>
      <View style={styles.microphone}>
        <Icon.Button
          name="microphone"
          size={120}
          color={isRecording ? 'red' : 'black'}
          backgroundColor="transparent"
          onPress={handleMicrophonePress}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userInputContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    height: dateHeight,
    alignItems: 'center',
  },
  entry: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  microphone: {
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  }
});

export default SingleEntry;
