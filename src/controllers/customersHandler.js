const { db, admin } = require("../config/firebase");


exports.createCustomer = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const customerRef = await db.collection("customers").add({
      name,
      phone,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      message: "Customer created",
      customerId: customerRef.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create customer" });
  }
};

// Get customers
exports.getCustomers = async (req, res) => {
  try {
    const snapshot = await db.collection("customers").get();
    const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};
