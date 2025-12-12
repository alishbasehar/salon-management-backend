// firebase.js
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// Service account JSON का path
const serviceAccountPath = path.join(__dirname, "mysalon.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

// Firebase initialize
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
