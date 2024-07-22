import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/api/healthy', (req, res) => {
  res.status(200).json({
    success:true,
    message:"My App server is healthy"
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});