// config/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("./mysalon.json"); // path sahi hona chahiye

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db, admin };
