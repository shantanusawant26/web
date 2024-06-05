// const mongoose = require('mongoose');

// // Replace with your MongoDB connection string
// const uri = "mongodb://127.0.0.1:27017/vsTechHorizon";

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connection established successfully!"))
//     .catch(err => console.log("MongoDB connection failed: ", err));

// module.exports = mongoose;



const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri ="mongodb+srv://shantanusawant26:RgQ7INcGijt5L7iM@cluster0.pbuzob9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("vsTechHorizon").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);




const mongoose = require('mongoose');
const uri = "mongodb+srv://shantanusawant26:RgQ7INcGijt5L7iM@cluster0.pbuzob9.mongodb.net/vsTechHorizon?retryWrites=true&w=majority";
//const uri ="mongodb+srv://vstechhorizon:Software@cluster0.kljlv7f.mongodb.net/vsTechHorizon?retryWrites=true&w=majority&appName=Cluster0";
// Connect to MongoDB Atlas
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        // If connected successfully, proceed to save data
        // saveData();
    })
    .catch(err => console.error('Failed to connect to MongoDB Atlas:', err));
