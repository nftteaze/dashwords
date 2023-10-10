import React, { useEffect, useState } from 'react'; // Import useState from React
import { getAuth, signInWithRedirect, TwitterAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import { Redirect } from 'react-router-dom';

function Authentication() {
  const auth = getAuth(app);
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    const provider = new TwitterAuthProvider();
    
    signInWithRedirect(auth, provider);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User authenticated:', user);
      } else {
        console.log('User not authenticated');
      }
      
      setRedirecting(false);
    });
  }, []);

  if (redirecting) {
    return <div>Redirecting...</div>;
  }

  return <Redirect to="/home" />;
}

export default Authentication;
