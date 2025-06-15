const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const contactRoutes = require('./routes/contact');

dotenv.config();

console.log("Mongo URI:", process.env.MONGO_URI); // Debug line

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../BoldVizByte-frontend')));

// API route
app.use('/api/contact', contactRoutes);

// Fallback route for frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../BoldVizByte-frontend/index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("MongoDB connection error:", err));
