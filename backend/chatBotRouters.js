// Define route for sending messages
const express = require('express');
const routers = express.Router();
const ChatBot = require('./chatBot');
const { model } = require('mongoose');



routers.post('/message', async (req, res) => {
    const { text } = req.body;

    // Log the received request body
    console.log("Received request body:", req.body);

    if (!text) {
        return res.status(400).json({ message: "No text provided in the request body" });
    }

    // Check if the message is already stored in the database
    const existingMessage = await ChatBot.findOne({ userMessage: text });

    if (existingMessage) {
        // If the message is found, return the corresponding response
        res.json({ message: existingMessage.response });
    } else {
        console.log("Message not found in database, storing new message:", text);
        // If the message is not found, store the message and ask for a response
        const newMessage = new ChatBot({ userMessage: text, response: 'Please provide a response.' });

        try {
            await newMessage.save();
            console.log("Stored new message:", newMessage);
            res.json({ message: 'I don\'t have a response for that. Please provide a response:' });
        } catch (error) {
            console.error("Error storing new message:", error);
            res.status(500).json({ message: 'Error storing message' });
        }
    }
});

// Define route for setting a response to a message
routers.post('/response', async (req, res) => {
    const { userMessage, response } = req.body;

    console.log("Updating response for message:", userMessage, "to:", response);

    if (!userMessage || !response) {
        return res.status(400).json({ message: "Both userMessage and response fields are required" });
    }

    // Update the message with the provided response
    const updatedMessage = await ChatBot.findOneAndUpdate(
        { userMessage },
        { response },
        { new: true }
    );

    if (updatedMessage) {
        console.log("Response updated:", updatedMessage);
        res.json({ message: 'Response saved successfully.' });
    } else {
        console.error("Message not found for updating response.");
        res.status(404).json({ message: 'Message not found.' });
    }
});

// Define route for retrieving all messages (for testing purposes)
routers.get('/messages', async (req, res) => {
    const messages = await ChatBot.find();
    res.json(messages);
});


module.exports=routers;