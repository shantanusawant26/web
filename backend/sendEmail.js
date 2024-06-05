const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vstechhorizon@gmail.com', // Your email address
        pass: 'pprw zoxt vnoy kiga' // Your password for the email address
    }
});

// Function to send email
function sendEmail(to, subject, text) {
    console.log(subject)
    let mailOptions = {
        from: '"VS Tech Horizon" vstechhorizon@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendEmail;
