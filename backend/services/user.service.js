const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createUser = async (data) => {
  const user = await User.create(data);
  const { _id, username, email } = user;
  return { _id, username, email };
};

exports.getAllUsers = () => User.find().select('-password');
exports.getUserByEmail = email => User.findOne({ email });
exports.updateUser = (email, data) => User.findOneAndUpdate({ email }, data, { new: true }).select('-password');
exports.deleteUser = email => User.findOneAndDelete({ email });

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user: { id: user._id, username: user.username, email: user.email } };
  }
  const err = new Error('Identifiants invalides'); err.status = 401;
  throw err;
};