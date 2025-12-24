const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const servicesHandler = require("../controllers/servicesHandler");

router.post("/create", authMiddleware, roleMiddleware("admin"), servicesHandler.createService);
router.get("/", authMiddleware, servicesHandler.getServices);

module.exports = router;
