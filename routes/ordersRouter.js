const express = require('express');
const db = require('../config/firestore');

const app = express.Router();
const ordersColectionRef = db.collection('orders');

/**
 *
 * POST   /orders
 * @param {String} uid
 * @param {Object} newOrder
 */
const postNewOrder = async (uid, newOrder) => {};
// End postNewOrder

/**
 *
 * GET    /orders/all
 */
const getAllOrders = async () => {};
// End getAllOrders

/**
 *
 * GET    /orders?uid=
 * @param {String} uid
 */
const getOrdersByUid = async (uid) => {};
// End getOrdersByUid

/**
 *
 * PUT    /orders?id=
 * @param {String} id
 * @param {Object} update
 */
const updateOrdersById = async (id, update) => {};
// End updateOrdersById

/**
 *
 * DELETE /orders?id=
 * @param {String} id
 */
const deleteOrdersById = async (id) => {};
// End deleteOrdersById

/**
 *
 * GET /availability
 */
const getAvailability = async () => {
  const docRef = availabilityColectionRef.doc('standards');
  try {
    const document = await docRef.get();
    if (document.exists) {
      return document.data();
    } else {
      // doc.data() will be undefined in this case
      console.log('Standards not found in the DataBank');
    }
  } catch (error) {
    console.error('Error getting document: ', error);
  }
};
// End getAvailability

module.exports = ordersRouter = app;
