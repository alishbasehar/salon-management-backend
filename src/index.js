require("dotenv").config();
const express = require("express");

const app = express();

// Routes
const productsRouter = require("./routes/products");
const customersRoutes = require("./routes/customersRoutes");
const appointmentsRoutes = require("./routes/appointmentRoutes");

app.use(express.json());

// APIs
app.use("/api/products", productsRouter); 
app.use("/customers", customersRoutes);   
app.use("/appointments", appointmentsRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
