const express = require('express');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./routes/usersRouter.js');
const ordersRouter = require('./routes/ordersRouter.js');
const availabilityRouter = require('./routes/availabilityRouter.js');

const app = express();
app.use(express.json());

//define origin url
app.use(cors({ origin: 'https://mlt-tag-test.web.app' }));

app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/availability', availabilityRouter);

app.get('/api', (_, res) => {
  res.send('Server running');
});

app.listen(process.env.PORT || 8080, function (err) {
  if (err) console.log(err);
  console.log('Server listening');
});
