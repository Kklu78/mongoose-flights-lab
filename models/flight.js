const mongoose = require('mongoose');

const destinationsSchema = new mongoose.Schema({
    airport: String,
    arrival: {type:Date, default: new Date((new Date()).getFullYear() +1, (new Date()).getMonth(), (new Date()).getDate())}
})

const flightSchema = new mongoose.Schema({
    airline: String,
    airport: String,
    flightNo: {type:Number, min:10, max:9999},
    departs: {type:Date, default: new Date((new Date()).getFullYear() +1, (new Date()).getMonth(), (new Date()).getDate())},
    destinations: [destinationsSchema]
})

module.exports = mongoose.model('Flight', flightSchema);