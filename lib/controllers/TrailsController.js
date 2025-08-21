const Trail = require('../models/Trail');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    Trail
      .insert(req.body)
      .then(trail => res.send(trail))
      .catch(next);
  })
  .put('/:id', (req, res, next) => {
    Trail
      .updateById(req.params.id, req.body)
      .then(trail => res.send(trail))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Trail
      .find()
      .then(trails => res.send(trails))
      .catch(next);
  })
  .get('/:trail_id', (req, res, next) => {
    Trail
      .findById(req.params.trail_id)
      .then(trail => res.send(trail))
      .catch(next);
  })
  .delete('/:trail_id', (req, res, next) => {
    Trail
      .deleteById(req.params.trail_id)
      .then(trail => res.send(trail))
      .catch(next);
  });