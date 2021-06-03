const express = require('express');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./routes/usersRouter.js');
const ordersRouter = require('./routes/ordersRouter.js');
const availabilityRouter = require('./routes/availabilityRouter.js');
const { sendNodeMail } = require('./e-mails/nodeMailer');

const app = express();
app.use(express.json());

//define origin url
app.use(
  cors({
    origin: ['https://mlt-tag-test.web.app', 'http://localhost:3000'],
    optionsSuccessStatus: 200, // For legacy browser support
  })
);

app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/availability', availabilityRouter);

app.get('/api', (_, res) => {
  res.send('Server running');
});

app.get('/checkEmail', async (req, res) => {
  const { subject, message } = req.query;
  const info = await sendNodeMail(
    subject,
    `<h1>HI leo</h1><p>Hello, i sent from node</p><p>${message}</p>`
  );
  res.send(info);
});

app.listen(process.env.PORT, function (err) {
  if (err) console.log(err);
  console.log('Server listening');
});
