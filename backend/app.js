const dbconnection= require("./db")
const cors = require('cors');
const express = require("express");
const app = express();
const conatactUsRouters = require("./contactUsRouters");
const applicationFormRouters = require("./applicationFormRouters");
const classesRouters = require('./classRouters')
const bodyParser = require("body-parser");
const subscribeRouters = require("./subscribeRouters")
const chatBotRouter = require('./chatBotRouters')

// Define middleware
app.use(express.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

app.use('/resume', express.static('resume'));


// app.use(cors({
//     origin: 'http://localhost:4200' // Replace with your frontend URL
//   }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Define URL handler
app.use("/", conatactUsRouters);
app.use("/",applicationFormRouters);
app.use("/",classesRouters)
app.use("/",subscribeRouters)
app.use("/",chatBotRouter)
// Start the server
const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});




module.exports = app;
