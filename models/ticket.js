const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
    seat: String,
    price: {type: Number, min: 0},
    flight: [{type: mongoose.Schema.Types.ObjectId, ref: 'Flight'}] 
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);