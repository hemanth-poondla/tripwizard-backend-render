const express = require('express');
const cors = require('cors');
const generateRoute = require('./routes/generate');
const allowedOrigins = ['http://localhost:3000', 'https://trip-wizard1.vercel.app'];

const app = express();
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

app.use('/api/generate', generateRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});