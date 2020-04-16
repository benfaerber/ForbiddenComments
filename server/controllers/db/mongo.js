const mongo = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/';

let users;
(async () => {
  let client = await mongo.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  db = client.db('forbid');
  // Import modules
  exports.user = require('./user')(db);
  //run playground
  await exports.user.playground();
})().catch((err) => console.error(err));
