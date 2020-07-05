const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const checkBusinessOwner = require('../../../middleware/CheckBusinessOwner');
const checkObjectId = require('../../../middleware/CheckObjectId');

const userControllerBusiness = require('../../../controllers/business/userControllerBusiness');

// @route    POST /business/user
// @desc     Add user to existing business
// @access   Public
// @return   User token
router.post(
  '/',
  [
    checkBusinessOwner,
    [
      check('role', 'Role is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ]
  ],
  userControllerBusiness.addUserToBusiness
);

// @route    DELETE business/user/:user_id
// @desc     Delete user
// @access   Private
router.delete(
  '/:user_id',
  [checkBusinessOwner, checkObjectId('user_id')],
  userControllerBusiness.deleteUser
);

// @route    POST /business/user/:user_id
// @desc     Edit user of existing business
// @access   Public
// @return   User token
router.post(
  '/:user_id',
  [
    checkBusinessOwner,
    checkObjectId('user_id'),
    [
      (check('role', 'Role is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty())
      // check('email', 'Please include a valid email').isEmail()
    ]
  ],
  userControllerBusiness.editUser
);

//activate and deactivate user
// @route    POST /business/user/:user_id
// @desc     Edit user of existing business
// @access   Public
// @return   User token
router.get(
  '/:user_id',
  [checkBusinessOwner, checkObjectId('user_id')],
  userControllerBusiness.activateOrDeactivateUser
);

module.exports = router;
