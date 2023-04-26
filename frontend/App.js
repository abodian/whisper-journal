import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import theme from './core/theme'
import MainContainer from './navigation/MainContainer'
import StartScreen from './user/StartScreen'
import LoginScreen from './user/LoginScreen'
import RegisterScreen from './user/RegisterScreen'
import ResetPasswordScreen from './user/ResetPasswordScreen'
import AboutScreen from './navigation/screens/AboutScreen'
import UpdateEmailScreen from './user/UpdateEmailScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    // <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
          <Stack.Screen name="MainContainer" component={MainContainer} />
          <Stack.Screen name="UpdateEmailScreen" component={UpdateEmailScreen} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    // </Provider>
  )
}