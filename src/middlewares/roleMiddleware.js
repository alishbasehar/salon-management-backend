const { db } = require("../config/firebase");

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const { userId } = req.user;

      const userDoc = await db.collection("users").doc(userId).get();

      if (!userDoc.exists) {
        return res.status(400).json({ message: "User not found" });
      }

      const userData = userDoc.data();

      if (userData.role !== requiredRole) {
        return res.status(400).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Role verification failed" });
    }
  };
};

module.exports = roleMiddleware;
