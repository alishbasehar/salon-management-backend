
const express = require("express");
const router = express.Router();
const db = require("../firebase");     // Firestore import


router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err });
  }
});

router.post("/", async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newProduct = { name, price };
    const docRef = await db.collection("products").add(newProduct);

    res.status(200).json({ id: docRef.id, ...newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const doc = await db.collection("products").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});

module.exports = router;
