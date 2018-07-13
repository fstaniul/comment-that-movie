const express = require('express');
const app = require('../server');
const validator = require('validator');
const router = (module.exports = express.Router());

function movieExists(movieId) {
  const Movie = app.db.models.Movie;
  return Movie.findById(movieId).then((movie) => {
    if (!movie)
      return Promise.reject({
        message: 'Cannot create comment for not existing movie. Invalid movie id!',
      });
  });
}

function getComments(req, res) {
  const Comment = app.db.models.Comment;
  let { movieId, limit = '', skip = '' } = req.query;
  limit = validator.isNumeric(limit) ? +limit : false;
  skip = validator.isNumeric(skip) ? +limit : false;

  let query = {};
  if (movieId) Object.assign(query, { where: { movieId } });
  if (limit) query.limit = limit;
  if (skip) query.offset = skip;

  return Comment.findAndCount(query).then(({ count, rows }) => {
    const comments = rows.map((comment) => comment.toJSON());
    res.json({ count, comments });
  });
}

function postComments(req, res, next) {
  const Comment = app.db.models.Comment;
  const { comment, movieId } = req.body;

  if (!comment || !movieId) {
    return next({ message: 'Missing comment and movieId in request body', httpcode: 400 });
  }

  movieExists(movieId)
    .then(() => Comment.create({ comment, movieId }))
    .then((createdComment) => {
      res.json(createdComment.toJSON());
    })
    .catch((err) => next(err));
}

router
  .route('/comments')
  .get(getComments)
  .post(postComments);
