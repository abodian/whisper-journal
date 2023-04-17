// signup
import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/Button";

export default function SettingsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <Button
          mode="contained"
          // onPress={}
          style={{marginTop: 100, width: 200}}
        >
          Change Password
        </Button>
        <Button
          mode="contained"
          // onPress={}
          style={{marginTop: 5, width: 200}}
        >
          Change Email
        </Button>
        <Button
          mode="contained"
          // onPress={}
          style={{marginTop: 5, width: 200}}
        >
          About
        </Button>
      </View>
      <View style={styles.logoutContainer}>
        <Button
        mode="outlined"
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
