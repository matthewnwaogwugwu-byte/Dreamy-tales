// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve your HTML files

// Route to handle form submission
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'matthewnwaogwugwu@gmail.com',      // Your Gmail
            pass: 'ynokrflpuitsqzur',                 // Your App Password from Google
        },
    });

    let mailOptions = {
        from: email,                                  // Sender email from form
        to: 'matthewnwaogwugwu@gmail.com',           // Your Gmail to receive emails
        subject: `New message from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
