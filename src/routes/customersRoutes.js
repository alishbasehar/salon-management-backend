const express = require('express');
const router = express.Router();
const controller = require('../controllers/customersController');


router.post('/create', controller.createCustomer);
router.get('/', controller.getCustomers);
router.get('/:id', controller.getCustomerById);


module.exports = router;