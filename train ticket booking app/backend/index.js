const express = require('express')
require("dotenv").config();
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRoutes')
const trainRoutes = require('./routes/trainRoutes')
const crypto = require('crypto');
const { Cashfree } = require('cashfree-pg');
const db = require("./db/db");
app.use(cors())
app.use(bodyParser.json())
app.use((err, req, res, next) => {
    console.error(err); // Log error details
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
    next();
});
app.use('/user', userRoutes)
app.use('/train', trainRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Server startesd on port ${process.env.PORT}`);
});
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);
    const orderId = hash.digest('hex');
    return orderId.substr(0, 12);
}
app.get('/payment/:id', async (req, res) => {

    try {
        let request = {
            "order_amount": req.params.id,
            "order_currency": "INR",
            "order_id": generateOrderId(),
            "customer_details": {
                "customer_id": "webcodder01",
                "customer_phone": "9999999999",
                "customer_name": "Web Codder",
                "customer_email": "webcodder@example.com"
            },
        }

        Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
            res.json(response.data);

        }).catch(error => {
            console.error(error.response.data.message);
        })
    } catch (error) {
        console.log(error);
    }

})

app.post('/verify', async (req, res) => {
    try {
        let { orderId } = req.body;
        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
            res.json(response.data);
        }).catch(error => {
            console.error(error.response.data.message);
        })
    } catch (error) {
        console.log(error);
    }
})