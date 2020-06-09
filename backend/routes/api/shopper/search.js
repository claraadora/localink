const express = require('express');
const router = express.Router();
const config = require('config');
const URI = config.get('mongoURI');
const MongoClient = require('mongodb').MongoClient;
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const getDistance = require('../distance/distance');
const geocode = require('../distance/geocode');

let shopper = null;

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
    shopper = await Shopper.findById(req.user.id);
    const coordinates = {
      type: 'Point',
      coordinates: [shopper.latLng.lat, shopper.latLng.lng]
    };
    MongoClient.connect(
      URI,
      {
        useUnifiedTopology: true
      },
      (error, client) => {
        console.log('MongoDB client connected... Searching...');
        const db = client.db('test');
        const rank = req.body.rank;
        const sortBy = sort(rank);
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
              $lookup: {
                from: 'shops',
                localField: 'shop',
                foreignField: '_id',
                as: 'shop_docs'
              }
            },
            {
              $project: {
                _id: 0,
                name: 1,
                description: 1,
                price: 1,
                image: 1,
                shop_docs: 1,
                score: { $meta: 'searchScore' }
              }
            }
          ])
          .sort(sortBy)
          .each(async function (error, product) {
            if (product) {
              products.unshift(product);
            } else {
              res.status(200).json(products);
            }
          });
      }
    );
  }
);

function sort(rank) {
  if (rank == 'price') {
    return { price: -1 };
  } else if (rank == 'distance') {
    return { distance: 1 };
  } else if (rank == 'rating') {
    return { 'shop_docs.0.ratings': 1 };
  } else {
    return { score: 1 };
  }
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
//           "analyzer": "lucene.standard",
//            "multi": {
//              "keywordAnalyzer": {
//              "type": "string",
//              "analyzer": "lucene.keyword"
//             }
//           }
//         }
//       }
//     }
//   }

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
