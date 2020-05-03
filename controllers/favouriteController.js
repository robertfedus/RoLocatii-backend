const User = require('./../models/userModel');

exports.postFavourite = async (req, res) => {
  if (!req.body.email || !req.body.favourite)
    return res.status(400).json({
      status: 'fail',
      message: 'Te rog sa verifici body-ul request-ului si sa incerci din nou.'
    });

  try {
    const user = await User.findOne({ email: req.body.email });

    for (const favourite of user.favourites)
      if (favourite.id === req.body.favourite.id)
        return res.status(409).json({
          status: 'fail',
          message: 'Locatia apare deja in lista de favorite.'
        });

    user.favourites.push(req.body.favourite);
    await user.save();

    return res.status(200).json({
      status: 'success',
      message: 'Succes!'
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

exports.getFavourites = async (req, res) => {
  if (!req.query.email)
    return res.status(400).json({
      status: 'fail',
      message: 'Email-ul este necesar ca parametru ar URL-ului.'
    });

  try {
    const user = await User.findOne({ email: req.query.email });
    return res.status(200).json({
      status: 'succes',
      data: user.favourites
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
