import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { auth } from "../firebase";
import { updateEmail } from "firebase/auth";

export default function UpdateEmailScreen() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [confirmEmail, setConfirmEmail] = useState({ value: "", error: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigation = useNavigation();

  const updateUserEmail = async () => {
    if (email.value !== confirmEmail.value) {
      setConfirmEmail({ ...confirmEmail, error: "Email addresses do not match" });
      return;
    }

    try {
      await updateEmail(auth.currentUser, email.value);
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
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Update Email</Header>
      {submitted ? (
        <Text>Please input your new email address below</Text>
      ) : (
        <>
          <TextInput
            label="New email address"
            returnKeyType="done"
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
            label="Confirm email address"
            returnKeyType="done"
            value={confirmEmail.value}
            onChangeText={(text) => setConfirmEmail({ value: text, error: "" })}
            error={!!confirmEmail.error}
            errorText={confirmEmail.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            description="You will receive a confirmation email at your new address."
          />
          <Button
            mode="contained"
            onPress={updateUserEmail}
            style={{ marginTop: 16 }}
          >
            Update Email
          </Button>
        </>
      )}
    </Background>
  );
}
