import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from './firebase'; // Import the initialized Firebase app

const db = getFirestore(app);

// Function to update user data in the Firestore collection
const updateUserStats = async (userId, newGameData) => {
  const userRef = doc(collection(db, 'users'), userId);

  try {
    // Get existing user data from Firestore
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Merge existing user data with new game data
      const updatedUserData = {
        highestScore: Math.max(userData.highestScore || 0, newGameData.highestScore || 0),
        totalGamesPlayed: (userData.totalGamesPlayed || 0) + 1,
        totalPoints: (userData.totalPoints || 0) + newGameData.totalPoints,
        winStreak: Math.max(userData.winStreak || 0, newGameData.winStreak || 0),
      };

      // Update the user data in Firestore
      await setDoc(userRef, updatedUserData, { merge: true });
      console.log('User data updated successfully:', updatedUserData);
    } else {
      // Handle the case where the user document does not exist
      console.error('User document not found for ID:', userId);
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error; // Re-throw the error to handle it where updateUserStats is called
  }
};

export default updateUserStats;
