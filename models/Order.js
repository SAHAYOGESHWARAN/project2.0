const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
