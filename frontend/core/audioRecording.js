// import { useState, useEffect, useRef } from "react";
// import { Audio } from "expo-av";
// import axios from "axios";

// export const useAudioRecording = () => {
//   const [recording, setRecording] = useState(null);
//   const [recordings, setRecordings] = useState([]);
//   const [message, setMessage] = useState("");
//   const [transcribedData, setTranscribedData] = useState([]);
//   const [interimTranscribedData, setInterimTranscribedData] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isTranscribing, setIsTranscribing] = useState(false);
//   const [transcribeTimeout, setTranscribeTimeout] = useState(5);
//   const [stopTranscriptionSession, setStopTranscriptionSession] =
//     useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const intervalRef = useRef(null);
//   const stopTranscriptionSessionRef = useRef(stopTranscriptionSession);
//   stopTranscriptionSessionRef.current = stopTranscriptionSession;

//   useEffect(() => {
//     return () => clearInterval(intervalRef.current);
//   }, []);

//   async function startRecording() {
//     try {
//       console.log("Requesting permissions..");
//       const permission = await Audio.requestPermissionsAsync();
//       if (permission.status === "granted") {
//         await Audio.setAudioModeAsync({
//           allowsRecordingIOS: true,
//           playsInSilentModeIOS: true,
//         });
//         alert("Starting recording..");
//         const RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
//           android: {
//             extension: ".mp4",
//             outputFormat:
//               Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
//             audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
//             sampleRate: 44100,
//             numberOfChannels: 2,
//             bitRate: 128000,
//           },
//           ios: {
//             extension: ".wav",
//             audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
//             sampleRate: 44100,
//             numberOfChannels: 2,
//             bitRate: 128000,
//             linearPCMBitDepth: 16,
//             linearPCMIsBigEndian: false,
//             linearPCMIsFloat: false,
//           },
//         };
//         const { recording } = await Audio.Recording.createAsync(
//           RECORDING_OPTIONS_PRESET_HIGH_QUALITY
//         );
//         setRecording(recording);
//         console.log("Recording started");
//         setStopTranscriptionSession(false);
//         setIsRecording(true);
//         intervalRef.current = setInterval(
//           transcribeInterim,
//           transcribeTimeout * 1000
//         );
//         console.log("Recording object:", recording);
//       } else {
//         setMessage("Please grant permission to app to access microphone");
//       }
//     } catch (err) {
//       console.error(" Failed to start recording", err);
//     }
//   }

//   async function stopRecording() {
//     console.log("Stopping recording..");
//     setRecording(null);
//     await recording.stopAndUnloadAsync();
//     const uri = recording.getURI();
//     let updatedRecordings = [...recordings];
//     const { sound, status } = await recording.createNewLoadedSoundAsync();
//     updatedRecordings.push({
//       sound: sound,
//       duration: getDurationFormatted(status.durationMillis),
//       file: recording.getURI(),
//     });
//     setRecordings(updatedRecordings);
//     console.log("Recording stopped and stored at", uri);

//     clearInterval(intervalRef.current);
//     setStopTranscriptionSession(true);
//     setIsRecording(false);
//     setIsTranscribing(false);
//   }

//   function getDurationFormatted(millis) {
//     const minutes = millis / 1000 / 60;
//     const minutesDisplay = Math.floor(minutes);
//     const seconds = Math.round(minutes - minutesDisplay) * 60;
//     const secondDisplay = seconds < 10 ? `0${seconds}` : seconds;
//     return `${minutesDisplay}:${secondDisplay}`;
//   }
  
//   function getRecordingLines() {
//     return recordings.map((recordingLine, index) => {
//       return (
//         <View key={index} style={styles.row}>
//           <Text style={styles.fill}>
//             {" "}
//             Recording {index + 1} - {recordingLine.duration}
//           </Text>
//           <Button
//             style={styles.button}
//             onPress={() => recordingLine.sound.replayAsync()}
//             title="Play"
//           ></Button>
//         </View>
//       );
//     });
//   }
  
//   function transcribeInterim() {
//     clearInterval(intervalRef.current);
//     setIsRecording(false);
//   }
  
//   async function transcribeRecording() {
//     const uri = recording.getURI();
//     const filetype = uri.split(".").pop();
//     const filename = uri.split("/").pop();
//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append(
//       "audio_data",
//       {
//         uri,
//         type: `audio/${filetype}`,
//         name: filename,
//       },
//       "temp_recording"
//     );
//     try {
//       const response = await fetch("http://192.168.0.106/transcribe", {
//         method: "POST",
//         body: formData,
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       const responseData = await response.json();
//       setTranscribedData((oldData) => [...oldData, responseData]);
//       setIsLoading(false);
//       setIsTranscribing(false);
//       intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000);
//     } catch (error) {
//       console.log("error :", error);
//     }
  
//     if (!stopTranscriptionSessionRef.current) {
//       setIsRecording(true);
//     }
//   }
  

//   return {startRecording, stopRecording, getDurationFormatted, getRecordingLines, transcribeInterim, transcribeRecording}

// }
   


import { useState, useCallback } from 'react';
import { Audio } from 'expo-av';

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
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });
    setRecordings(updatedRecordings);
    console.log('Recording stopped and stored at', uri);
    setRecording(null)
    return recordings;
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

  const transcribeRecording = async () => {
    const uri = recording.getURI();
    const filetype = uri.split(".").pop();
    const filename = uri.split("/").pop();
    setLoading(true);
    const formData = new FormData();
    formData.append("language", selectedLangRef.current);
    formData.append("model_size", modelOptions[selectedModelRef.current]);
    formData.append(
      "audio_data",
      {
        uri,
        type: `audio/${filetype}`,
        name: filename,
      },
      "temp_recording"
    );
    axios({
      url: "https://2c75-197-210-53-169.eu.ngrok.io/transcribe",
      method: "POST",
      data: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("response :", response);
        setTranscribedData((oldData) => [...oldData, response.data]);
        setLoading(false);
        setIsTranscribing(false);
        intervalRef.current = setInterval(
          transcribeInterim,
          transcribeTimeout * 1000
        );
      })
      .catch((error) => {
        console.log("error :", error);
      });
  
    if (!stopTranscriptionSessionRef.current) {
      setRecording(true);
    }
  };
  
  

  return { startRecording, stopRecording, getDurationFormatted, getRecordingLines, transcribeRecording };
}
