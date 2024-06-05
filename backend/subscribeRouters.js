const Subscribe = require('./subscribe');
const express = require('express');
const router = express.Router();
const sendEmail = require('./sendEmail');



router.post('/subscribe', async (req, res) => {
    console.log(req.body);
    try {
        const data = req.body;
        const subscribe = new Subscribe(data);
        await subscribe.save();
        const subject = 'Thank you for submitting the form';
        const message = 'We have received your submission. Thank you!';
        sendEmail(req.body.email, subject, message);
        res.status(201).json({ message: 'Subscribe successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to Subscribe' });
    }

})



router.get('/subscribe', async (req, res) => {
    try {
        const subscribes = await Subscribe.find();
        res.status(200).json(subscribes);
    } catch (error) {
        console.error('Error fetching form details:', error);
        res.status(500).json({ message: 'Failed to fetch form details' });
    }
})



module.exports = router;