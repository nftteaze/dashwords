import React, { useContext, createContext } from 'react';
import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { app } from './firebase'; // Import your Firebase configuration

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = getAuth(app);

  const handleTwitterLogin = async () => {
    const provider = new TwitterAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Handle successful login
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  const value = {
    handleTwitterLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
