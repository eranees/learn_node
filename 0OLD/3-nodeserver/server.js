const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.post('/post', (req, res) => {
  const data = req.body;
  console.log(data);
  res.send(`${JSON.stringify(data)}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
