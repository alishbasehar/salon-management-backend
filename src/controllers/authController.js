const db = require("../config/firebase");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const { generateToken } = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userRef = db.collection("users");
    const snapshot = await userRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    };

    await userRef.add(newUser);

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRef = db.collection("users");
    const snapshot = await userRef.where("email", "==", email).get();

    if (snapshot.empty) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userDoc = snapshot.docs[0];
    const user = { id: userDoc.id, ...userDoc.data() };

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
