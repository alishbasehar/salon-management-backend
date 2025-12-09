
require("dotenv").config();   // Load .env variables

const express = require("express");
const app = express();
const productsRouter = require("./routes/products");

app.use(express.json());
app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
