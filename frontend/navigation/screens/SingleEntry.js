import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Text, Keyboard, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormattedDate from '../../components/Date';
import AddEntry from '../../core/AddEntry';
import BackButton from "../../components/BackButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAudioRecording } from '../../core/audioRecording';
import { Audio } from 'expo-av';
import { readFileAsBase64 } from '../../logic/readFileAsBase64';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const dateHeight = aspectRatio >= 0.75 ? height * 0.4 : height * 0.3;
const addEntryHeight = (height - dateHeight) / 2;

const SingleEntry = ({ navigation, date: propDate }) => {
  const route = useRoute();
  const routeDate = route.params && route.params.date;
  const selectedDate = propDate && propDate !== '' ? propDate : routeDate;
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, transcribeRecording } = useAudioRecording();
  const [sound, setSound] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [buttonColor, setButtonColor] = useState('black');

  // hides microphone when keyboard is open
  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardShown(true);
      }
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      }
    );
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

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

  // sets and stops recording, also handles colour change
  const handleMicrophonePress = async () => {
    if (!isRecording) {
      await startRecording();
      setIsRecording(true);
      setButtonColor('red'); 
    } else {
      // Disable the button while the stopRecording() method is running
      setButtonColor('gray');
      const uri = await stopRecording();
      if (uri) {
        console.log('Recorded audio file URI:', uri);
        playRecording(uri);
        const base64Audio = await readFileAsBase64(uri);
        const audioTranscription = await transcribeRecording(base64Audio);
        console.log('this is microphone function', audioTranscription);
        setTranscription(audioTranscription);
      }
      setIsRecording(false);
      setButtonColor('black'); 
    }
    console.log('setTranscription', transcription);
  };


  return (
    <View style={styles.container}>
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

        {!keyboardShown && (
          <View style={styles.microphone}>
          <Icon.Button
            name="microphone"
            size={120}
            color={buttonColor} // use the new state variable to set the button color
            backgroundColor="transparent"
            onPress={handleMicrophonePress}
            disabled={buttonColor === 'gray'} // disable the button when it's gray
          />
          </View>
        )}

      </View>
    </View>
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

