import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';

const FirebaseContext = createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, set the user state
        setUser(currentUser);
      } else {
        // User is signed out, set the user state to null
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const signInWithTwitter = async () => {
    // Implement your Twitter authentication logic using Firebase auth methods here
  };

  const signOut = async () => {
    // Implement sign out logic using Firebase auth methods here
  };

  return (
    <FirebaseContext.Provider value={{ user, signInWithTwitter, signOut }}>
      {children}
    </FirebaseContext.Provider>
  );
};
