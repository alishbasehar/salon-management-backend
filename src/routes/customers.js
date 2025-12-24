const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const customersHandler = require("../controllers/customersHandler");

router.post("/create", authMiddleware, customersHandler.createCustomer);
router.get("/", authMiddleware, customersHandler.getCustomers);

module.exports = router;
