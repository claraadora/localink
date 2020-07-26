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
      //console.log('MongoDB client connected...');
      const db = client.db('test');
      //For testing

      // db.collection('shoppers').remove(
      //   { email: 'oliviajjohansen@yahoo.com' },
      //   { $multi: true }
      // );
      // db.collection('shoppers').remove(
      //   { email: 'oliviajjohansen@gmail.com' },
      //   { $multi: true }
      // );
      // db.collection('users').remove(
      //   { name: 'test user owner' },
      //   { $multi: true }
      // );
      // db.collection('users').remove(
      //   { name: 'test user staff' },
      //   { $multi: true }
      // );
      // db.collection('businesses').remove(
      //   { shopName: 'test create or update profile' },
      //   { $multi: true }
      // );
      // db.collection('businesses').remove(
      //   { shopName: 'test business first owner, user owner, user staff' },
      //   { $multi: true }
      // );
      // db.collection('shops').remove(
      //   { shopName: 'test create or update profile' },
      //   { $multi: true }
      // );
      // db.collection('products').remove(
      //   { image: 'test img url' },
      //   { $multi: true }
      // );
      // db.collection('products').remove(
      //   { name: 'test product ' },
      //   { $multi: true }
      // );
      dbb = db;
    }
  );
  return dbb;
};

module.exports = connectClient;
