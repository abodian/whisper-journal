import { useState, useCallback } from 'react';
import { Audio } from 'expo-av';

export function useAudioRecording() {
  const [recording, setRecording] = useState(null);

  const startRecording = useCallback(async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: true,
      });
      console.log('Starting recording..');
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
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

  return { startRecording, stopRecording };
}
