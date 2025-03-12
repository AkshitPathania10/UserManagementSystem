const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const LogMiddleware = require("./logs/setupLogging");

require("dotenv").config();

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/userDB";

const connectDB = async () => {
  try {
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Middleware
app.use(LogMiddleware);
app.use(cors());
app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});
