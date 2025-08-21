const Ride = require('../models/Ride');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Ride
      .insert(req.body)
      .then(ride => res.send(ride))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Ride
      .updateById(req.params.id, req.body)
      .then(ride => res.send(ride))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Ride
      .find()
      .then(rides => res.send(rides))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Ride
      .findById(req.params.id)
      .then(ride => res.send(ride))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Ride
      .deleteById(req.params.id)
      .then(ride => res.send(ride))
      .catch(next);
  });