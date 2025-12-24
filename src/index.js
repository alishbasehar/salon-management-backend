require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/authRoutes");
const customersRoutes = require("./routes/customers");
const servicesRoutes = require("./routes/services");

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is running! Welcome to Salon API");
});


app.use("/auth", authRoutes);


app.use("/customers", customersRoutes);
app.use("/services", servicesRoutes);


app.use((req, res, next) => {
  res.status(400).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
