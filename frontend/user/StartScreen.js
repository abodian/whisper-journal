// first screen when starting app
import React from 'react'
import { StyleSheet } from "react-native";
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

const StartScreen = ({ navigation }) => {
  return (
    <Background>
      <Logo />
      {/* <Header>Whisper Journal</Header> */}
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
    </Background>
  )
}



export default StartScreen
