const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name:String,
    gender:String,
    age:Number,
    berth:String,
    nationality:String,
    mobile:Number,
    email:String,
    bookingid:Number,
    source:String,
    destination:String,
    train:String,
    class:String,
    quota:String,
    code:String,
    seat:String,
    date:String
});
const bookingModel = mongoose.model('bookingdata', bookingSchema);

module.exports = bookingModel;