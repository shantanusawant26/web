const express = require('express');
const router = express.Router();
const Contact = require('./contactUs')
const sendEmail = require('./sendEmail');






router.post('/contact', async (req, res) => {

    console.log(req.body)
    try {
        
        const formData = req.body;
        const newContact = new Contact(formData);
        await newContact.save();
        console.log(formData)
        const userEmail = req.body.email;
        console.log(userEmail)
        const subject = 'Thank you for submitting the form';
        // const message = 'We have received your submission. Thank you!';
        const message =`

        Dear ${formData.name},

        Thank you for reaching out to us. We have received your submission, and we appreciate your interest in our services.

        Here are the details you provided:
        Name: ${formData.name}
        Email: ${formData.email}
        Subject: ${formData.subject}
        Phone: ${formData.phone}
        Message: ${formData.message}

        Our team will review your inquiry and get back to you as soon as possible. If you have any further questions or concerns, feel free to reply to this email or contact us using the details provided below.

        Thank you again for choosing VS Tech Horizon.

        Best regards,
        VS Tech Horizon
        Website: www.vstechhorizon.com
        Contact: +91 93253 60357
        Email: vstechhorizon@gmail.com`;

        sendEmail(userEmail, subject, message);
        res.status(201).json({ message: 'Form details saved successfully' });
    } catch (error) {
        console.error('Error saving form details:', error);
        res.status(500).json({ message: 'Failed to save form details' });
    }
});

// Route to get form details
router.get('/contact', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching form details:', error);
        res.status(500).json({ message: 'Failed to fetch form details' });
    }
});

module.exports = router;