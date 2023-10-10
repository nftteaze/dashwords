import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { app } from './firebase'; // Import the initialized Firebase app

const db = getFirestore(app);

// Function to update user data in the Firestore collection
const updateUserStats = async (userId, userData) => {
  const userRef = doc(collection(db, 'users'), userId);

  console.log('Updating user data for user ID:', userId);
  console.log('User data to be updated:', userData);

  try {
    // Check if userData.highestScore is undefined or null, if so, set it to 0
    if (userData.highestScore === undefined || userData.highestScore === null) {
      userData.highestScore = 0;
    }

    await setDoc(userRef, userData, { merge: true }); // Use merge option to merge with existing data
    console.log('User data updated successfully:', userData);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; // Re-throw the error to handle it where updateUserStats is called
  }
};

export default updateUserStats;
