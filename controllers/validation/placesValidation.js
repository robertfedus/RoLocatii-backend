exports.getPlaces = (req, res, next) => {
  if (!req.query.radius)
    return fail(
      res,
      400,
      'Te rog sa introduci raza de cautare in parametrii URL-ului.'
    );

  if (!req.query.location)
    return fail(
      res,
      400,
      'Te rog sa introduci coordonatele locului din care vrei sa cauti in parametrii URL-ului.'
    );

  if (!req.query.type)
    return fail(
      res,
      400,
      'Te rog sa introduci tipul locatiilor pe care vrei sa le cauti in parametrii URL-ului.'
    );

  if (!req.query.resedinta)
    return fail(
      res,
      400,
      'Te rog sa introduci resedinta judetului in care vrei sa cauti locatii in parametrii URL-ului'
    );

  return next();
};

const fail = (res, code, message) => {
  return res.status(code).json({
    status: 'fail',
    message
  });
};
