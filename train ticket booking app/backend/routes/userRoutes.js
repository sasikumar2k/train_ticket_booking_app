const express = require("express");
const User = require('../model/userModel')
const BookingUser = require('../model/bookingModel')
const router = express.Router();
router.post('/sign-up', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({ message: 'File added successfully' });
    } catch (error) {
        return res.status(500).send(error.message);
    }
})
router.post('/sign-in', async (req, res) => {
    const { email, password, mobile:phone } = req.body;
    try {
        const user = await User.findOne({ email });
        const mobile = await User.findOne({ phone });
        if (user && password === user.password || mobile && password === mobile.password) {
            return res.status(201).json({ message: 'user logged in successfuly', success: true });
        }
        else {
            return res.status(201).json({ message: 'Invalid credentials', success: false });
        }

    } catch (error) {
        console.log(error);
        
        return res.status(500).send(error.message);
    }
})
router.post('/book-user', async (req, res) => {
    try {
        const bookUser = new BookingUser(req.body)
        await bookUser.save()
        return res.status(201).json({ message: 'booking user data successfully added', success: true, data: req.body });
    } catch (error) {
        console.log(error);

        return res.status(500).send(error.message);
    }
})
router.get('/bookingid/:id', async (req, res) => {
    try {
        const bookUser = await BookingUser.findOne({ bookingid: req.params.id })
        return res.send(bookUser)
    } catch (error) {
        console.log(error);

        return res.status(500).send(error.message);
    }
})
router.get('/getallbooking', async (req, res) => {
    try {
        const bookedUser = await BookingUser.find()
        return res.send(bookedUser)
    } catch (error) {
        console.log(error);

        return res.status(500).send(error.message);
    }
})
module.exports = router