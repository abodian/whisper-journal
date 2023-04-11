import React, { useState } from "react";
import { View } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { LoggedIn } from "./components/LoggedIn";
import { Signup } from "./components/SignUp";
import { Login } from "./components/LogIn";
import { ResetPassword } from "./components/ResetPassword";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const getScreen = () => {
    if (loggedIn) return <LoggedIn />;
    if (screen === "signup") return <Signup setScreen={setScreen} />;
    if (screen === "reset-password")
      return <ResetPassword setScreen={setScreen} />;
    return <Login setScreen={setScreen} />;
  };

  return <View style={{ flex: 1 }}>{getScreen()}</View>;
}
