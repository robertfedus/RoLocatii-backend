const axios = require('axios');

const API_KEY = 'AIzaSyA_Rb8VyZp258TtwgI1Fso2byw5TVj1AXI';

exports.getPlaces = (req, res) => {
  const radius = req.query.radius;
  const coord = req.query.location;
  const type = req.query.type === 'null' ? '' : `&type=${req.query.type}`;

  const resedinta = req.query.resedinta;
  const pageToken = req.query.pagetoken;

  getPlaces(res, radius, coord, type, resedinta, pageToken);
};

const getPlaces = (res, radius, coord, type, resedinta, page) => {
  const URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  let reqString;
  if (page)
    reqString = `${URL}?pagetoken=${page}&key=${API_KEY}&radius=${radius}&location=${coord}${type}`;
  else
    reqString = `${URL}?key=${API_KEY}&radius=${radius}&location=${coord}${type}`;

  axios
    .get(reqString)
    .then(function (response) {
      const locations = response.data.results.filter((location) => {
        if (location.vicinity.includes(resedinta)) return true;
        else return false;
      });
      const responseData = { ...response.data };
      responseData.results = [...locations];

      return res.status(200).json({
        status: 'success',
        data: responseData
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.getPlace = (req, res) => {
  let URL;
  if (req.query.place_id)
    URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&place_id=${req.query.place_id}`;
  else
    return res.status(400).json({
      status: 'fail',
      message:
        'Te rog sa introduci ID-ul locatiei pe care o cauti in parametrii URL-ului.'
    });

  axios
    .get(URL)
    .then(function (response) {
      return res.status(200).json({
        status: 'success',
        data: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
