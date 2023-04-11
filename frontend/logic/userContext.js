import { firebase } from "./firebase";
import React, { useContext } from "react";

//create context with an initial null value for user
export const userContext = React.createContext({
  user: null,
});

//creates react hook that allows us to access context
export const useSession = () => {
  const { user } = useContext(userContext);
  return user;
};

export const useAuth = () => {
  const [state, setState] = React.useState(() => {
    // firebase.auth().currentUser is a handy built in method to access the current user!
    const user = firebase.auth().currentUser;

    return {
      initializing: !user,
      user,
    };
  });

  function onChange(user) {
    setState({ initializing: false, user });
  }

  React.useEffect(() => {
    // listen for auth state changes with firebase's useful built in method
    // change the state to the current user (null if signed out)
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);

    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return state;
};
