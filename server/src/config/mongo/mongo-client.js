const mongoURI = 'mongodb://mongo:27017';
const {MongoClient} = require('mongodb');

module.exports.client = new MongoClient(process.env.MONGO_URI || mongoURI, {useUnifiedTopology: true});
