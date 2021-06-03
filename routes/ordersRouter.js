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

module.exports = ordersRouter = app;
