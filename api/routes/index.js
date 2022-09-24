var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/bookings', (req, res, next) => {
  req.collection.find({})
  .toArray()
  .then(results => res.json(results))
  .catch(error => res.send(error));
});

router.post('/bookings', (req, res, next) => {
  const { bookingDate, name, email} = req.body;
  if (!bookingDate || !name || !email) {
    return res.status(400).json({
      message: 'booking date, name and email are required.',
    });
  }

  const payload = { bookingDate, name, email};
  req.collection.insertOne(payload)
  .then(result => res.json(result))
  .catch(error => res.send(error));
});

router.delete('/bookings/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectId(id);

  req.collection.deleteOne({ _id })
    .then(results => res.json(result))
    .catch(error => res.send(error));
})

module.exports = router;
