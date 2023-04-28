// first screen when starting app
import React from 'react'
import { StyleSheet } from 'react-native'
import BackgroundUserScreens from '../components/BackgroundUserScreens'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

const StartScreen = ({ navigation }) => {
  return (
    <BackgroundUserScreens style={styles.container}>
      <Logo />
      {/* <Header>Whisper Journal</Header> */}
      {/* <Paragraph>
        Hi, please login to your Whisper Journal account.
      </Paragraph> */}
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
    </BackgroundUserScreens>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default StartScreen
