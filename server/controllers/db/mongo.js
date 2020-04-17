const mongo = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/';
const ObjectId = require('mongodb').ObjectId;

(async () => {
  let client = await mongo.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  db = client.db('forbid');
  // Import modules
  exports.user = require('./user')(db, ObjectId);
  exports.comment = require('./comment')(db, ObjectId);
  //run playground
  await exports.comment.playground();
})().catch((err) => console.error(err));
