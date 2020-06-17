const express = require("express");
const router = express.Router();
const config = require("config");
const URI = config.get("mongoURI");
const MongoClient = require("mongodb").MongoClient;
const { check, validationResult } = require("express-validator");
const authShopper = require("../../../middleware/authShopper");

// @route    POST /search
// @desc     Get search results
// @access   Private
// @return   Array of products
router.post(
  "/",
  check("search", "Search bar cannot be empty").not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    MongoClient.connect(
      URI,
      {
        useUnifiedTopology: true,
      },
      (error, client) => {
        console.log("MongoDB client connected... Searching...");
        const products = [];
        const db = client.db("test");
        const { search, service } = req.body;
        db.collection("products")
          .aggregate([
            {
              $search: {
                // compound: {
                //   should: [
                //     {
                //       text: {
                //         query: search,
                //         path: 'name',
                //         fuzzy: {
                //           maxEdits: 1,
                //           maxExpansions: 50
                //         },
                //         score: { boost: { value: 2 } }
                //       }
                //     },
                //     {
                //       text: {
                //         query: search,
                //         path: 'description',
                //         fuzzy: {
                //           maxEdits: 1,
                //           maxExpansions: 50
                //         }
                //       }
                //     }
                //   ]
                text: {
                  query: search,
                  path: ["name", "description"],
                  fuzzy: {
                    maxEdits: 1,
                    maxExpansions: 50,
                  },
                  // range: {
                  //   path: 'name',
                  //   score: { boost: { value: 2 } }
                  // }
                  // score: { boost: { value: 2 } }
                },
              },
            },
            {
              $match: {
                isService: service,
              },
            },
            {
              $lookup: {
                from: "shops",
                localField: "shop",
                foreignField: "_id",
                as: "shop_docs",
              },
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
                score: { $meta: "searchScore" },
              },
            },
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
  }
);

// function sort(rank) {
//   if (rank == 'price') {
//     return { price: -1 };
//   } else if (rank == 'shop_docs.0.distance') {
//     return { distance: 1 };
//   } else if (rank == 'rating') {
//     return { 'shop_docs.0.ratings': 1 };
//   } else {
//     return { score: 1 };
//   }
// }

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
