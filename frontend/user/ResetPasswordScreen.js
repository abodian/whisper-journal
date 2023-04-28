// reset password
import React, { useState } from "react";
import {
  Text,
} from "react-native";
import BackgroundUserScreens from '../components/BackgroundUserScreens'
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [submitted, setSubmitted] = useState(false);

  const resetUserPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email.value);
      setSubmitted(true);
      setEmail({ ...email, error: "" });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setEmail({ ...email, error: "User not found" });
      } else {
        setEmail({ ...email, error: "There was a problem with your request" });
      }
    }
  };

  return (
    <BackgroundUserScreens>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      {submitted ? (
        <Text>Please check your email for a reset password link.</Text>
      ) : (
        <>
          <TextInput
            label="E-mail address"
            returnKeyType="done"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            description="You will receive an email with a password reset link."
          />
          <Button
            mode="contained"
            onPress={resetUserPassword}
            style={{ marginTop: 16 }}
          >
            Send Instructions
          </Button>
        </>
      )}
    </BackgroundUserScreens>
  );
}

export default ResetPasswordScreen