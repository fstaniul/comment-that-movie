const express = require('express');

const router = (module.exports = express.Router());

function getMovies(req, res) {}

function postMovies(req, res) {}

router
  .route('/movies')
  .get(getMovies)
  .post(postMovies);
