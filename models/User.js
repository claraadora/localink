const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  isAccountActive: {
    type: Boolean,
    default: false
  },
  activated: {
    type: Boolean
  }
});

module.exports = User = mongoose.model('User', UserSchema);
