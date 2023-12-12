const express  = require('express');
const app = express();
const PORT = 8082;

// Root route

const listUsers = [{ "id": 1, "name": "Item 1" },
{ "id": 2, "name": "Item 2" },
{ "id": 3, "name": "Item 3" }];

// Users route (placeholder)
app.get('/users', (req, res) => {
  // You can query your database and retrieve a list of users here
  // res.json( listUsers );
  res.json( listUsers );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});