const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./../models/userModel');

exports.register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const userObj = {
    name: req.body.name,
    email: req.body.email,
    password
  };

  try {
    const user = new User(userObj);
    await user.save();
    user.password = undefined;

    return createToken(res, user);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: 'fail',
      message:
        process.env.NODE_ENV === 'production' ? 'Internal server error' : err
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      '+password'
    );

    const validPass = user
      ? await bcrypt.compare(req.body.password, user.password)
      : undefined;

    if (!user || !validPass) {
      return res.status(401).json({
        status: 'fail',
        message: 'Email-ul si parola nu coincid.'
      });
    }

    user.password = undefined;
    return createToken(res, user);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: 'fail',
      message:
        process.env.NODE_ENV === 'production' ? 'Internal server error' : err
    });
  }
};

const createToken = (res, user) => {
  return jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    (err, token) => {
      return res.status(200).json({
        status: 'success',
        message: 'Succes!',
        data: { user, token }
      });
    }
  );
};

exports.deleteUser = async (req, res) => {
  if (!req.query.email)
    return res.status(400).json({
      status: 'fail',
      message: '"email" trebuie sa fie in parametrii URL-ului.'
    });

  try {
    await User.deleteOne({ email: req.query.email });

    return res.status(200).json({
      status: 'success',
      message: 'Utilizator sters cu succes!'
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: 'fail',
      message:
        process.env.NODE_ENV === 'production' ? 'Internal server error' : err
    });
  }
};
