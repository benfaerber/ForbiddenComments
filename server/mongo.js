let db;

const mongo = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/';

(async () => {
	let client = await mongo.connect(connectionString, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	});
	db = client.db('node');

})().catch(err => console.error(err));