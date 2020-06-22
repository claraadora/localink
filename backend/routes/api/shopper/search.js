const express = require('express');
const router = express.Router();
const config = require('config');
const URI = config.get('mongoURI');
const MongoClient = require('mongodb').MongoClient;
const connectClient = require('../../../config/clientdb');
const { check, validationResult } = require('express-validator');
const authShopper = require('../../../middleware/authShopper');

// @route    POST /search
// @desc     Get search results
// @access   Private
// @return   Array of products
router.post(
  '/',
  check('search', 'Search bar cannot be empty').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const db = await connectClient();

    const products = [];

    const { search, service } = req.body;
    db.collection('products')
      .aggregate([
        {
          $search: {
            compound: {
              should: [
                {
                  text: {
                    query: search,
                    path: 'name',
                    fuzzy: {
                      maxEdits: 2,
                      maxExpansions: 50
                    },
                    score: { boost: { value: 1.5 } }
                  }
                },
                {
                  text: {
                    query: search,
                    path: { value: 'name', multi: 'keywordAnalyzer' },
                    fuzzy: {
                      maxEdits: 1,
                      maxExpansions: 50
                    },
                    score: { boost: { value: 1.5 } }
                  }
                },
                {
                  text: {
                    query: search,
                    path: { value: 'name', multi: 'simpleAnalyzer' },
                    fuzzy: {
                      maxEdits: 2,
                      maxExpansions: 50
                    },
                    score: { boost: { value: 1.5 } }
                  }
                },
                {
                  text: {
                    query: search,
                    path: 'description',
                    fuzzy: {
                      maxEdits: 2,
                      maxExpansions: 50
                    }
                  }
                },
                {
                  text: {
                    query: search,
                    path: {
                      value: 'description',
                      multi: 'keywordAnalyzer'
                    },
                    fuzzy: {
                      maxEdits: 2,
                      maxExpansions: 50
                    }
                  }
                },
                {
                  text: {
                    query: search,
                    path: {
                      value: 'description',
                      multi: 'simpleAnalyzer'
                    },
                    fuzzy: {
                      maxEdits: 2,
                      maxExpansions: 50
                    }
                  }
                },
                {
                  wildcard: {
                    path: ['name', 'description'],
                    query: search + '*',
                    allowAnalyzedField: true
                  }
                }
              ]
            }
          }
        },
        {
          $match: {
            isService: service
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
            isService: 1,
            stock: 1,
            shop_docs: 1,
            score: { $meta: 'searchScore' }
          }
        }
      ])
      .sort({ score: 1 })
      .each(async function (error, product) {
        if (product) {
          products.unshift(product);
        } else {
          res.status(200).json(products);
        }
      });
  }
);

module.exports = router;

// {
//   "mappings": {
//     "dynamic": false,
//     "fields": {
//       "description": {
//         "type": "string",
//         "analyzer": "lucene.standard",
//         "multi": {
//           "keywordAnalyzer": {
//             "analyzer": "lucene.keyword",
//             "type": "string"
//           },
//           "simpleAnalyzer": {
//             "type": "string",
//             "analyzer": "lucene.simple"
//             }
//         }
//       },
//       "name": {
//         "type": "string",
//         "analyzer": "lucene.standard",
//         "multi": {
//           "keywordAnalyzer": {
//             "analyzer": "lucene.keyword",
//             "type": "string"
//           },
//           "simpleAnalyzer": {
//             "type": "string",
//             "analyzer": "lucene.simple"
//             }
//         }
//       }
//     }
//   }
// }
