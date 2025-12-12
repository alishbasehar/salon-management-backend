
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");


const serviceAccountPath = path.join(__dirname, "mysalon.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
