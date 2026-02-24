import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// request logger
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// health route
app.get("/", (req, res) => {
  res.send("Server running + DB connected 🚀");
});

// test DB route
app.get("/test-db", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ success: true, collections });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);