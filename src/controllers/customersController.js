const db = require('../config/firebase');
const { validateCustomer } = require('../validators/customerValidator');

exports.createCustomer = async (req, res) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const { name, email } = req.body;

    const docRef = await db.collection('customers').add({
      name,
      email,
      createdAt: new Date(),
    });

    res.status(200).json({
      message: 'Customer created successfully',
      id: docRef.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const snapshot = await db.collection('customers').get();
    const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const doc = await db.collection('customers').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
