// first screen when starting app
import React from 'react'
import { View, Text } from "react-native";
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import SvgUri from 'react-native-svg-uri';

const StartScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Logo</Text>
      <Header>Whisper Journal Login</Header>
      <Paragraph>
        Hi, please login to your Whisper Journal account.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </View>

  )
}

export default StartScreen
