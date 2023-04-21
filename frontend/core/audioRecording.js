import { useState, useCallback } from 'react';
import { Audio } from 'expo-av';
import base64 from 'react-native-base64';
import { Platform } from 'react-native'; // Import Platform
import { encode } from 'base-64';
import * as FileSystem from 'expo-file-system';


export function useAudioRecording() {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  

  const recordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};


  const startRecording = useCallback(async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });
      console.log('Starting recording..');
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(
        recordingOptions
        // Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (!recording) {
      return;
    }

    console.log('Stopping recording..');
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    console.log('Recording stopped and stored at', uri);
    return uri;
  }, [recording]);

  const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round(minutes - minutesDisplay) * 60;
    const secondDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondDisplay}`;
  }

  const getRecordingLines = () => {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            {" "}
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            style={styles.button}
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
          ></Button>
        </View>
      );
    });
  }


  const transcribeRecording = async (audioBase64) => {
    try {
      const response = await fetch('https://whisper-journal1.onrender.com/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audioBase64 }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      console.log('Server response status:', response.status);
      const responseText = await response.text();
      console.log('Server response text:', responseText);
      const data = JSON.parse(responseText);
      console.log(data.transcription);
      return data.transcription;
    } catch (error) {
      console.error('audioRecording.js', error);
      throw error;
    }
  };

  return { startRecording, stopRecording, getDurationFormatted, getRecordingLines, transcribeRecording };
}
