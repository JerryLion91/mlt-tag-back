const express = require('express');
const db = require('../config/firestore');

const app = express.Router();
const userColectionRef = db.collection('users');

/**
 *
 * POST   /users?uid=  Complete User
 * @param {String} uid in the query
 * @param {Object} userData in the body
 */
app.post('/', async (req, res, next) => {
  const { uid } = req.query;
  console.log('DEVELOP USER VALIDATION');
  const userData = req.body;
  try {
    await db.runTransaction(async (t) => {
      const docRef = userColectionRef.doc(uid);
      const doc = await t.get(docRef);
      // uid exists in dataBank
      if (doc.exists) {
        throw new Error('Document alredy exists in databank');
      }
      t.set(docRef, userData);
    });
    console.log('User Document successfully added!');
    res.send(uid);
  } catch (err) {
    next(err);
  }
});
// End postNewUser

/**
 *
 * GET    /users/all
 */
app.get('/all', async (req, res, next) => {
  const usersArray = [];
  try {
    const snapshot = await userColectionRef.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    snapshot.forEach((doc) => {
      usersArray.push({ uid: doc.id, details: doc.data() });
    });
    res.send({ allUsers: usersArray });
  } catch (err) {
    next(err);
  }
});
// End getAllUsers

/**
 *
 * GET    /users?uid=
 * @param {String} uid in the query
 */
app.get('/', async (req, res, next) => {
  const { uid } = req.query;
  try {
    const doc = await userColectionRef.doc(uid).get();
    if (!doc.exists) throw new Error('No such document!');
    res.send(doc.data());
  } catch (err) {
    next(err);
  }
});
// End getUserByUid

/**
 *
 * PUT    /users?uid= Field to Update
 * @param {String} uid in the query
 * @param {Object} update in the body
 */
app.put('/', async (req, res, next) => {
  const { uid } = req.query;
  console.log('DEVELOP USER VALIDATION');
  const update = req.body;
  try {
    await db.runTransaction(async (t) => {
      const docRef = userColectionRef.doc(uid);
      const doc = await t.get(docRef);
      // uid exists in dataBank
      if (!doc.exists) {
        throw new Error('No such document!');
      }
      t.update(docRef, update);
    });
    console.log('User Document successfully updated!');
    res.send({ uid: uid, update: update });
  } catch (err) {
    next(err);
  }
});
// End updateUserByUid

/**
 *
 * DELETE /users?uid=
 * @param {String} uid in the query
 */
app.delete('/', async (req, res, next) => {
  const { uid } = req.query;
  try {
    const timestamp = await userColectionRef.doc(uid).delete();
    res.send(timestamp);
  } catch (err) {
    next(err);
  }
});
// End deleteUserByUid

/**
 *
 * POST   /users/address?uid=
 * @param {String} uid in the query
 * @param {Object} addresses in the body
 */
app.post('/address', async (req, res, next) => {
  const { uid } = req.query;
  console.log('DEVELOP ADDRESSES VALIDATION');
  const addresses = req.body;
  try {
    await db.runTransaction(async (t) => {
      const docRef = userColectionRef.doc(uid);
      const doc = await t.get(docRef);
      // uid exists in dataBank
      if (!doc.exists) {
        throw new Error('No such document!');
      }
      t.set(docRef, addresses, { merge: true });
    });
    console.log('Addresses successfully added!');
    res.send({ uid: uid, ...addresses });
  } catch (err) {
    next(err);
  }
});
// End postUserNewAddressesByUid

/**
 *
 * GET    /users/address?uid=
 * @param {String} uid in the query
 */
app.get('/address', async (req, res, next) => {
  const { uid } = req.query;
  const docRef = userColectionRef.doc(uid);
  try {
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error('No such document!');
    }
    res.send({ addresses: doc.data().addresses });
  } catch (err) {
    next(err);
  }
});
// End getUserAddressesByUid

/**
 *
 * PUT    /users/address?uid=_&&index=
 * @param {String} uid in the query
 * @param {Number} index in the query
 * @param {Object} newAddress in the body
 */
app.put('/address', async (req, res, next) => {
  const { uid, index } = req.query;
  console.log('DEVELOP ADDRESSES VALIDATION');
  const newAddress = req.body;
  const docRef = userColectionRef.doc(uid);
  try {
    const updatedAddresses = await db.runTransaction(async (t) => {
      const doc = await t.get(docRef);
      const addresses = doc.data().addresses;
      const newAddressArray = addresses.map((address, i) => {
        if (i === parseInt(index, 10)) {
          return newAddress;
        } else {
          return address;
        }
      });
      t.update(docRef, { addresses: newAddressArray });
      return newAddressArray;
    });
    console.log('Addresses successfully updated!');
    res.send({ uid: uid, addresses: updatedAddresses });
  } catch (err) {
    next(err);
  }
});
// End updateUserAddressByUidAndIndex

/**
 *
 * DELETE /users/address?uid=_&&index=
 * @param {String} uid in the query
 * @param {Number} index in the query
 */
app.delete('/address', async (req, res, next) => {
  const { uid, index } = req.query;
  console.log('DEVELOP ADDRESSES VALIDATION');
  const newAddress = req.body;
  const docRef = userColectionRef.doc(uid);
  try {
    const updatedAddresses = await db.runTransaction(async (t) => {
      const doc = await t.get(docRef);
      const addresses = doc.data().addresses;
      const newAddressArray = addresses.filter((_, i) => {
        return i !== parseInt(index, 10);
      });
      t.update(docRef, { addresses: newAddressArray });
      return newAddressArray;
    });
    console.log('Addresses successfully deleted!');
    res.send({ uid: uid, addresses: updatedAddresses });
  } catch (err) {
    next(err);
  }
});
// End deleteUserAddressByUidAndIndex

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});
// End Error handler

module.exports = usersRouter = app;
