const Bike = require('../models/Bike');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Bike
      .insert(req.body)
      .then(bike => res.send(bike))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Bike
      .updateById(req.params.id, req.body)
      .then(bike => res.send(bike))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Bike
      .find()
      .then(bikes => res.send(bikes))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Bike
      .findById(req.params.id)
      .then(bike => res.send(bike))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Bike
      .deleteById(req.params.id)
      .then(bike => res.send(bike))
      .catch(next);
  });