const express = require('express');
const router = express.Router();
const Class = require('./class');
const { routes } = require('./app');
const sendEmail = require('./sendEmail');


router.post('/applytocourse', async (req, res) => {

    console.log(req.body)
    try {
        const formData = req.body;
        const classes = new Class(formData);
        await classes.save();
        const subject = 'Thank you for submitting the form';
        const message = 'We have received your submission. Thank you!';
        sendEmail(req.body.email, subject, message);
        res.status(201).json({ message: 'Form details saved successfully' });
    } catch (error) {
        console.error('Error saving form details:', error);
        res.status(500).json({ message: 'Failed to save form details' });
    }
});

// Route to get form details
router.get('/applications', async (req, res) => {
    try {
        const students = await Class.find();
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching form details:', error);
        res.status(500).json({ message: 'Failed to fetch form details' });
    }
});

router.get('/applications/standard/:standard', (req, res) => {
    const standard = req.params.standard;
    Class.find({ standard: standard }).exec()
    .then(applications => {
      res.json(applications);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error fetching applications' });
    });
  });

module.exports = router;