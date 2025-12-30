const { db, admin } = require("../config/firebase");

// Admin only
exports.createService = async (req, res) => {
  try {
    const { name, price, duration } = req.body;

    if (!name || !price || !duration) {
      return res.status(400).json({ message: "All fields required" });
    }

    const serviceRef = await db.collection("services").add({
      name,
      price,
      duration,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({
      message: "Service created",
      serviceId: serviceRef.id
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create service" });
  }
};

// All logged-in users
exports.getServices = async (req, res) => {
  try {
    const snapshot = await db.collection("services").get();
    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
};
