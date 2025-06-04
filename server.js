require("dotenv").config(); 
const express = require('express');
const cors = require('cors');
const generateRoute = require('./routes/generate');
const allowedOrigins = ['http://localhost:3000', 'https://tripwizard.vercel.app'];

const app = express();
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

app.use('/api/generate', generateRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});