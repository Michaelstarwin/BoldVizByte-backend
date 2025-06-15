const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// API route only (because frontend is served from Netlify separately)
app.use('/api/contact', contactRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");

  // Start server after DB connected
  app.listen(PORT, () => {
    console.log(🚀 Server running on port ${PORT});
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});
