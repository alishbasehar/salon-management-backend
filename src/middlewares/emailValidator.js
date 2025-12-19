
const emailValidator = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format add @" });
  }

  next(); 
};

module.exports = emailValidator;
