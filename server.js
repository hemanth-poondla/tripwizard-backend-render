const express = require('express');
const cors = require('cors');
const generateRoute = require('./routes/generate');
const allowedOrigins = ['http://localhost:3000', 'https://tripwizard-mlevcq1qd-hemanths-projects-1180f26d.vercel.app'];

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