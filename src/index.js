const express = require('express');
const { initDb } = require('./db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

initDb().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch((err) => {
  console.error('Failed to initialize database:', err);
});