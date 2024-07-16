// import admin from "firebase-admin";

// import serviceAccountKey from "./serviceAccountKey.json"
import admin from 'firebase-admin';

const serviceAccountKey = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

// Function to set custom claims
const setAdminClaims = async (email) => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Custom claims set for user: ${email}`);
  } catch (error) {
    console.error("Error setting custom claims:", error);
  }
};

// Example usage
const adminEmail = "serverwoods1@gmail.com";
setAdminClaims(adminEmail)
  .then(() => console.log("Admin claims set successfully"))
  .catch(console.error);