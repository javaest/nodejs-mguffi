const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Middleware für Authentifizierung
function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.API_KEY) {
    return next(); // Authentifizierung erfolgreich
  }
  return res.status(401).send('Unauthorized: Access Denied');
}

// Default-Route
app.get('/', (req, res) => {
  res.send('Willkommen auf der API! Ergänzen Sie die URL um "/api/users" für den Endpunkt.');
});

// API-Route mit Authentifizierung
app.get('/api/users', authenticate, (req, res) => {
  res.json(users);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
