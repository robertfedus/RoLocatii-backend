const validator = require('email-validator');
const User = require('./../../models/userModel');

exports.register = async (req, res, next) => {
  if (!req.body.name)
    return fail(
      res,
      400,
      'Te rog sa introduci "name" in body-ul request-ului.'
    );

  if (!req.body.email)
    return fail(
      res,
      400,
      'Te rog sa introduci "email" in body-ul request-ului.'
    );

  if (!req.body.password)
    return fail(
      res,
      400,
      'Te rog sa introduci "password" in body-ul request-ului.'
    );

  if (req.body.password.length < 6)
    return fail(res, 400, 'Parola trebuie sa contina minim 6 caractere');

  if (!req.body.confirmPassword)
    return fail(
      res,
      400,
      'Te rog sa introduci "confirmPassword" in body-ul request-ului.'
    );

  if (req.body.password !== req.body.confirmPassword)
    return fail(res, 400, 'Cele doua parole nu coincid.');

  if (!validator.validate(req.body.email))
    return fail(res, 400, 'Te rog sa introduci un email valid.');

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return fail(res, 400, 'Exista deja un cont cu adresa aceasta de email.');
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: 'fail',
      message:
        process.env.NODE_ENV === 'production' ? 'Internal server error' : err
    });
  }

  return next();
};

const fail = (res, code, message) => {
  return res.status(code).json({
    status: 'fail',
    message
  });
};
