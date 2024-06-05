const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const uri = "mongodb://127.0.0.1:27017/test";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connection established successfully!"))
    .catch(err => console.log("MongoDB connection failed: ", err));

module.exports = mongoose;
