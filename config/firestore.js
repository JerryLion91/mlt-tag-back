const admin = require('firebase-admin');
require('dotenv').config();
// const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(
    serviceAccount || process.env.SERVICE_ACCOUNT
  ),
});

module.exports = db = admin.firestore();
