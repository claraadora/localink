const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authShopper = require('../../../middleware/shopper/authShopper');

const searchController = require('../../../controllers/shopper/searchController');

// @route    POST /search
// @desc     Get search results
// @access   Private
// @return   Array of products
router.post(
  '/',
  check('search', 'Search bar cannot be empty').not().isEmpty(),
  searchController.search
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
