const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    name: String,
    code: {
        type:Number,
        unique:true
    },
    arriving: Number,
    departure: Number,
    seats: {
        type: Array,
        default: []
    },
    start: String,
    destination: String,
    bookedSeats: Number,
    quota: String,
    availability: {
        type: Array,
        default: []
    },
    classes: {
        type: Array,
        default: []
    },

});
const trainModel = mongoose.model('traindetails', trainSchema);

module.exports = trainModel;