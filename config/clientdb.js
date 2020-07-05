const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const URI = config.get('mongoURI');

let dbb = null;

const connectClient = async () => {
  await MongoClient.connect(
    process.env.MONGODB_URI || URI,
    {
      useUnifiedTopology: true
    },
    (error, client) => {
      if (error) {
        console.log('sww: ' + error);
      }
      console.log('MongoDB client connected...');
      const db = client.db('test');
      // //For testing
      // db.collection('products').remove(
      //   { name: 'test product create, update, delete' },
      //   { $multi: true }
      // );
      // db.collection('shops').remove(
      //   { shopName: 'updated test create or update profile' },
      //   { $multi: true }
      // );
      // db.collection('shops').remove(
      //   { shopName: 'test create or update profile' },
      //   { $multi: true }
      // );
      dbb = db;
    }
  );
  return dbb;
};

module.exports = connectClient;
