const express = require("express");
const Train = require('../model/trainModel')
const router = express.Router();
router.post('/post-train', async (req, res) => {
    try {
        const train = new Train(req.body)
        await train.save()
        res.status(201).json({ message: "Train data added successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Error occured" })
    }
})
router.get('/getalltrain', async (req, res) => {
    try {
        const train = await Train.find();
        res.send(train)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error occured" })
    }
})
router.get('/getbyid/:id', async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        res.send(train)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error occured" })
    }
})
router.get('/getbytraincode/:id', async (req, res) => {
    try {
        const train = await Train.findOne({ code: req.params.id });
        res.send(train)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error occured" })
    }
})
router.put('/updatetrainseats/:id', async (req, res) => {
    try {
        const train = await Train.findByIdAndUpdate({ _id: req.params.id }, req.body)
        res.status(201).json({ message: "Train data updated successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Error occured" })
    }
})
module.exports = router