const express = require('express');
const validator = require('validator');
const superagent = require('superagent');
const app = require('../server');
const router = (module.exports = express.Router());

const OMDB_URL = 'http://omdbapi.com';
const OMDB_KEY = process.env.OMDB_API_KEY;

function movieToJSON(movie) {
  const json = movie.toJSON();
  return { ...json.data, id: json.id };
}

function getMovies(req, res, next) {
  const Movie = app.db.models.Movie;
  let { id, limit = '', skip = '', title } = req.query;
  limit = validator.isNumeric(limit) ? +limit : false;
  skip = validator.isNumeric(skip) ? +skip : false;

  //If id passed return one instance with matching id
  if (id) {
    return Movie.findById(id)
      .then((movie) => res.json(movieToJSON(movie)))
      .catch(() => next(new Error('Movie with given id not found')));
  }

  // If title passed return one instance with matching title
  if (title) {
    return Movie.findOne({ where: { title } })
      .then((movie) => res.json(movieToJSON(movie)))
      .catch(() => next(new Error('Movie with given title not found')));
  }

  const query = {};
  if (limit) query.limit = limit;
  if (skip) query.offset = skip;

  return Movie.findAndCount(query)
    .then(({ count, rows }) => {
      res.json({ count, movies: rows.map((movie) => movieToJSON(movie)) });
    })
    .catch((err) => next(new Error('Internal server error!')));
}

function postMovies(req, res, next) {
  const Movie = app.db.models.Movie;
  const { title } = req.body;
  if (!title) {
    return next(new Error('You need to pass title in body of the request'));
  }

  superagent
    .get(OMDB_URL)
    .query({ apikey: OMDB_KEY, t: title, r: 'json' })
    .then((response) => {
      const body = response.body;
      if (body.Response !== 'True') {
        return Promise.reject(new Error('Movie with given title not found.'));
      }

      return Movie.findOrCreate({
        where: { title: body.Title },
        defaults: { title: body.Title, data: body },
      });
    })
    .then(([movie]) => {
      res.json(movieToJSON(movie));
    })
    .catch((err) => next(err));
}

router
  .route('/movies')
  .get(getMovies)
  .post(postMovies);
