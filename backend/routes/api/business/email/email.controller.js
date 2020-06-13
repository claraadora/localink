// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const {
//   transported,
//   getPasswordResetURL,
//   resetPasswordTemplate
// } = require('../../shopper/email/email');

// const mongoose = require('mongoose');
// const Business = require('../../../../models/Business');
// const User = require('../../../../models/User');
// const Shopper = require('../../../../models/Shopper');

// const usePasswordHashToMakeToken = (user, businessUser) => {
//   let password = null;
//   let payload = null;
//   if (user === businessUser) {
//     password = user.password;
//     payload = {
//       shopper: {
//         id: user.id
//       }
//     };
//   } else {
//     password = businessUser.password;
//     payload = {
//       business: {
//         id: business.id,
//         user_id: user.id
//       }
//     };
//   }
//   const secret = password + '-' + user.createdAt;

//   const token = jwt.sign(payload, secret, {
//     expiresIn: 3600
//   });
//   return token;
// };

// const sendPasswordResetEmail = async (req, res) => {
//   const { email } = req.params;
//   let user = null;
//   let businessUser = null;

//   try {
//     businessUser = await User.findOne({ email });

//     if (!businessUser) {
//       const shopper = await Shopper.findOne({ email });

//       if (!shopper) {
//         res.status(401).json({ msg: 'Cannot find user with that email' });
//       } else {
//         user = shopper;
//         businessUser = shopper;
//       }
//     } else {
//       user = await Business.findOne({
//         users: mongoose.Types.ObjectId(user.id)
//       });
//     }
//   } catch (error) {
//     res.status(404).json('No user with that email');
//   }
//   const token = usePasswordHashToMakeToken(user, businessUser);
//   const url = getPasswordResetURL(businessUser, token);
//   const emailTemplate = resetPasswordTemplate(user, businessUser, url);

//   const sendEmail = () => {
//     transported.sendMail(emailTemplate, (error, info) => {
//       if (error) {
//         console.log(error);
//         res.status(500).json('Error sending email');
//       } else {
//         //   console.log(info);
//         console.log(`**Email sent**`, info.response);
//         res.status(250).json('Email sent successfully');
//       }
//     });
//   };
//   sendEmail();
// };

// const receivedNewPassword = async (req, res) => {
//   const { user_id, token } = req.params;
//   const { password } = req.body;

//   let businessUser = null;
//   let user = null;
//   let collection = null;

//   try {
//     businessUser = await User.findById(user_id);

//     if (!businessUser) {
//       const shopper = await Shopper.findbyId(user_id);

//       if (!shopper) {
//         res.status(401).json({ msg: 'Cannot find user with that email' });
//       } else {
//         user = shopper;
//         businessUser = shopper;
//         collection = Shopper;
//       }
//     } else {
//       user = await Business.findOne({
//         users: mongoose.Types.ObjectId(user.id)
//       });
//       collection = User;
//     }

//     const salt = await bcrypt.genSalt(10);
//     const newPasswordHash = await bcrypt.hash(password, salt);
//     await collection.findByIdAndUpdate(user_id, { password: newPasswordHash });
//     res.status(202).json('Password change successful');
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// module.exports = { sendPasswordResetEmail, receivedNewPassword };
