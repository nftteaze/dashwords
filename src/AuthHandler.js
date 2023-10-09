import React, { useEffect } from 'react';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { app } from './firebase';

function AuthHandler() {
  const auth = getAuth(app);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        // Handle the authentication result here
        if (result.user) {
          // User is authenticated
          console.log('Twitter authentication successful:', result.user);
        } else {
          // User authentication failed or was canceled
          console.log('Twitter authentication failed:', result);
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  }, []);

  return <div>Checking Twitter authentication...</div>;
}

export default AuthHandler;
