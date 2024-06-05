const mongoose = require("mongoose")

const ChatBotSchema = new mongoose.Schema({
    userMessage: { type: String, required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }, { collection: 'chatBot' }
  );
  const chatBot = mongoose.model('chatBot', ChatBotSchema);

  module.exports = chatBot;