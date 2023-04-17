// signup
import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Button from "../components/Button";
import { auth } from "../firebase"

export default function SettingsScreen() {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  const resetPasswordNavigator = () => {
    navigation.navigate('ResetPasswordScreen')
  }

  const updateEmailNavigator = () => {
    navigation.navigate('UpdateEmailScreen')
  }

  const aboutScreenNavigator = () => {
    navigation.navigate('AboutScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <Button
          mode="contained"
          onPress={resetPasswordNavigator}
          style={{marginTop: 100, width: 200}}
        >
          Change Password
        </Button>
        <Button
          mode="contained"
          onPress={updateEmailNavigator}
          style={{marginTop: 5, width: 200}}
        >
          Change Email
        </Button>
        <Button
          mode="contained"
          onPress={aboutScreenNavigator}
          style={{marginTop: 5, width: 200}}
        >
          About
        </Button>
      </View>
      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={logout}
          style={{marginTop: 200 }}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  settingsContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    padding: 20,
  },
  logoutContainer: {
    flex: 2,
    flexDirection: 'column',
  },
});
