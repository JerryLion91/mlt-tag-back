const db = require('./config/firestore');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const router = require('./routes/router.js')

const app = express();
app.use(express.json());

//define origin url
app.use(cors({ origin: 'http://localhost:3000' }));

// app.use('/', router);

app.get('/api', (_, res) => {
  res.send('Server running');
});

app.listen(process.env.PORT || 8080, function (err) {
  if (err) console.log(err);
  console.log('Server listening');
});
