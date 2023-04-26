import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useNavigation } from "@react-navigation/native";

export default function BackButton({ goBack }) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) { // Check if there is a previous screen to navigate back to
      navigation.goBack();
    } else {
      navigation.navigate("StartScreen"); // Navigate to the StartScreen if there is no previous screen
    }
  };

  return (
    <TouchableOpacity onPress={handleGoBack} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
