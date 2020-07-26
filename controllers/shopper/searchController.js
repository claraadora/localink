const connectClient = require('../../config/clientdb');
const { validationResult } = require('express-validator');

async function search(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const db = await connectClient();

  const products = [];

  const { search, service } = req.body;
  const searchSubstring = search.substring(0, search.length - 1);
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
                  score: { boost: { value: 2 } }
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
                  score: { boost: { value: 2 } }
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
                  score: { boost: { value: 2 } }
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
              },
              {
                wildcard: {
                  path: ['name', 'description'],
                  query: searchSubstring + '*',
                  allowAnalyzedField: true
                }
              }
            ]
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
          _id: 1,
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

module.exports = { search };
