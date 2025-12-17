const db = require('../config/firebase');
const { validateAppointment } = require('../validators/appointmentValidator');


exports.createAppointment = async (req, res) => {
const { error } = validateAppointment(req.body);
if (error) {
return res.status(400).json({ message: error });
}


try {
const { customerId, serviceName, appointmentDate } = req.body;


const docRef = await db.collection('appointments').add({
customerId,
serviceName,
appointmentDate: new Date(appointmentDate),
createdAt: new Date(),
});


res.status(200).json({ id: docRef.id });
} catch (error) {
res.status(500).json({ error: error.message });
}
};


exports.getAppointments = async (req, res) => {
try {
const snapshot = await db.collection('appointments').get();
const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
res.json(appointments);
} catch (error) {
res.status(500).json({ error: error.message });
}
};


exports.getAppointmentById = async (req, res) => {
try {
const doc = await db.collection('appointments').doc(req.params.id).get();


if (!doc.exists) {
return res.status(404).json({ message: 'Appointment not found' });
}


res.json({ id: doc.id, ...doc.data() });
} catch (error) {
res.status(500).json({ error: error.message });
}
};