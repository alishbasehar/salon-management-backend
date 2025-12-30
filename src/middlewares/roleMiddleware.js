const { db } = require("../config/firebase");

const roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const { userId } = req.user;

      const userDoc = await db.collection("users").doc(userId).get();

      if (!userDoc.exists) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = userDoc.data();

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Role verification failed" });
    }
  };
};

module.exports = roleMiddleware;
