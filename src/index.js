
require("dotenv").config();


const express = require("express");


const authRoutes = require("./routes/authRoutes");
const productsRouter = require("./routes/products");
const customersRoutes = require("./routes/customersRoutes");
const appointmentsRoutes = require("./routes/appointmentRoutes");


const app = express();
app.use(express.json());


app.use("/auth", authRoutes);
app.use("/api/products", productsRouter);
app.use("/customers", customersRoutes);
app.use("/appointments", appointmentsRoutes);


console.log("JWT_SECRET:", process.env.JWT_SECRET);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
