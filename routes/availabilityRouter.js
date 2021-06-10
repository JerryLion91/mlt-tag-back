const express = require('express');
const db = require('../config/firestore');

const app = express.Router();
const availabilityColectionRef = db.collection('availability');

/**
 *
 * GET /availability
 */
app.get('/', async (_, res, next) => {
  const { std } = req.query;
  const docRef = availabilityColectionRef.doc(std);
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      res.send(doc.data());
    } else {
      // doc.data() will be undefined in this case
      throw new Error('Standards not found in the DataBank');
    }
  } catch (err) {
    next(err);
  }
});
// End getAvailability

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  res.status(500).send(err);
});
// End Error handler

module.exports = availabilityRouter = app;
