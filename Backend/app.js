require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
require("./db/conn"); // Ensure your DB connection is configured properly.

const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Admin routes
const adminAuthRoutes = require("./routes/admin/adminAuthroutes.js");
app.use("/api", adminAuthRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server started successfully" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
