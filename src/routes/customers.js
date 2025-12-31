const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const customersHandler = require("../controllers/customersHandler");

// Public route - anyone can create a customer
router.post(
  "/create",
  customersHandler.createCustomer
);


router.get(
  "/",
  authMiddleware,

  customersHandler.getCustomers
);

module.exports = router;
