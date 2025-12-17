const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointmentsController');


router.post('/create', controller.createAppointment);
router.get('/', controller.getAppointments);
router.get('/:id', controller.getAppointmentById);


module.exports = router;