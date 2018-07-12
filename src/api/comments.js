const express = require('express');

const router = (module.exports = express.Router());

function getComments(req, res) {}

function postComments(req, res) {}

router
  .route('/comments')
  .get(getComments)
  .post(postComments);
