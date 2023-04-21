// signup
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });


  // const createAccount = async () => {
  //   try {
  //     // Sign up the user using Firebase
  //     const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
  //     const { user } = userCredential;
  
  //     // Call your server API to store the user's name and email in MongoDB
  //     const response = await fetch('http://localhost:3001/users', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         name: name.value,
  //         email: email.value,
  //         password: password.value,
  //         firebaseUid: user.uid
  //       })
  //     });
  //     if (response.ok) {
  //       console.log('User created successfully!');
  //       // Reset navigation to dashboard
  //       // navigation.reset({
  //       //   index: 0,
  //       //   routes: [{ name: "Dashboard" }],
  //       // });
  //     } else {
  //       throw new Error('There was a problem creating the user.');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setEmail({ ...email, error: "There was a problem creating your account" });
  //     setPassword({ ...password, error: "There was a problem creating your account" });
  //   }
  // };
  

  

  // Original : 
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      navigation.reset({
        index: 0,
        routes: [{ name: "Dashboard" }],
      });
    } catch (e) {
      setEmail({ ...email, error: "There was a problem creating your account" });
      setPassword({ ...password, error: "There was a problem creating your account" });
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={createAccount}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
