import React, { useEffect } from 'react';
import { getAuth, signInWithRedirect, TwitterAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import { Redirect } from 'react-router-dom'; // Import Redirect from react-router-dom

function Authentication() {
  const auth = getAuth(app);
  const [redirecting, setRedirecting] = useState(true); // State to track if redirecting

  useEffect(() => {
    const provider = new TwitterAuthProvider();
    
    // Initiate the redirect flow
    signInWithRedirect(auth, provider);

    // Handle the redirect result
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, handle accordingly (e.g., redirect to home page)
        console.log('User authenticated:', user);
      } else {
        // User not authenticated, handle accordingly (e.g., redirect to login page)
        console.log('User not authenticated');
      }
      
      // Stop redirecting
      setRedirecting(false);
    });
  }, []);

  // Render a loading message while redirecting
  if (redirecting) {
    return <div>Redirecting...</div>;
  }

  // Optionally, you can redirect to a specific route after authentication
  return <Redirect to="/home" />;
}

export default Authentication;
