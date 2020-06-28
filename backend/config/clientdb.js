const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const URI = config.get('mongoURI');

let dbb = null;

const connectClient = async () => {
  await MongoClient.connect(
    URI,
    {
      useUnifiedTopology: true
    },
    (error, client) => {
      if (error) {
        console.log('sww: ' + error);
      }
      console.log('MongoDB client connected...');
      const db = client.db('test');
      // For testing
      // db.collection('users').remove(
      //   { name: 'test first business owner' },
      //   { $multi: true }
      // );
      dbb = db;
    }
  );
  return dbb;
};

module.exports = connectClient;
