import { useRoute } from '@react-navigation/native';
import { View, StyleSheet, Dimensions, Text, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import FormattedDate from '../components/Date';
import AddEntry from '../components/AddEntry';
import BackButton from "../components/BackButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAudioRecording } from '../core/audioRecording';
import { Audio } from 'expo-av';


const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const dateHeight = aspectRatio >= 0.75 ? height * 0.4 : height * 0.3;
const addEntryHeight = (height - dateHeight) / 2;

function SingleEntry({ navigation }) {
  const route = useRoute();
  const { date } = route.params;
  const [selectedDate, setSelectedDate] = useState(date);
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording } = useAudioRecording();
  const [sound, setSound] = useState(null);

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
      }
    }
    setIsRecording(!isRecording);
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
          You are adding entry for <FormattedDate date={date} />
        </Text>
        <Text>Press the microphone button to add your entry!</Text>
        <AddEntry selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
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
