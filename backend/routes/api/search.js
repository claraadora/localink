const express = require('express');
const router = express.Router();
const config = require('config');
const URI = config.get('mongoURI');
const MongoClient = require('mongodb').MongoClient;
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
var search;
const rankSearchBy = [];

// @route    POST /search
// @desc     Get search results
// @access   Private
// @return   Array of products
router.post(
  '/',
  [auth, check('search', 'Search bar cannot be empty').not().isEmpty()],
  async (req, res) => {
    let products = [];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    search = req.body.search;
    const rank = req.body.rank;
    if (rank === 'price') {
      //ascending
      rankSearchBy[0] = { $sort: { price: 1 } };
    } else if (rank === 'distance') {
      rankSearchBy[0] = { $sort: { distance: 1 } };
    }
    rankSearchBy[0] = req.body.rank;
    // Problem: if (!MongoClient.isConnected())
    MongoClient.connect(
      URI,
      {
        useUnifiedTopology: true
      },
      (error, client) => {
        console.log('MongoDb connected... Searching soon...');
        const db = client.db('test');
        db.collection('products')
          .aggregate([
            {
              $search: {
                text: {
                  query: req.body.search,
                  path: ['name', 'description'],
                  fuzzy: {
                    maxEdits: 1,
                    maxExpansions: 50
                  }
                }
              }
            },
            {
              $limit: 10
            },
            {
              $project: {
                _id: 1,
                name: 1,
                description: 1,
                shop: 1,
                price: 1,
                score: { $meta: 'textScore' }
              }
            },
            { $sort: { score: { $meta: 'textScore' } } }
          ])
          .each(async function (error, product) {
            if (product) {
              products.unshift(product);
            } else {
              const obj = await addShopObj(products);
              res.status(200).json(obj);
            }
          });
      }
    );
  }
);

async function addShopObj(productArr) {
  const obj = {
    search: search,
    shopAndProduct: []
  };
  await Promise.all(
    productArr.map(async product => {
      const shop = await Shop.findById(product.shop);
      const pair = {
        shop: shop,
        product: product
      };
      obj.shopAndProduct.unshift(pair);
    })
  );
  return obj;
}

function isPrice() {
  return rankSearchBy === 'price';
}

module.exports = router;

// {
//     "mappings": {
//       "dynamic": false,
//       "fields": {
//         "name": {
//           "type": "string",
//           "analyzer": "lucene.standard",
//           "multi": {
//             "keywordAnalyzer": {
//               "type": "string",
//               "analyzer": "lucene.keyword"
//             }
//           }
//         },
//         "description": {
//           "type": "string",
//           "analyzer": "lucene.standard"
//         }
//       }
//     }
//   }
