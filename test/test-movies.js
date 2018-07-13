const chai = require('chai');
chai.use(require('chai-http'));
chai.should();

describe('POST /movies', () => {
  let app;

  before(() => {
    app = require('../src/server');
  });

  it('Creates successfully resource with title: Iron Man', function() {
    return chai
      .request(app)
      .post('/movies')
      .send({ title: 'Iron Man' })
      .then((response) => {
        response.should.have.status(200);
        response.body.should.have.property('id');
        response.body.should.have.property('Title').equal('Iron Man');
      });
  });

  it('Fails to create resource with title: aaaaa', function() {
    return chai
      .request(app)
      .post('/movies')
      .send({ title: 'aaaaa' })
      .then((response) => {
        response.should.have.status(200);
        response.body.should.have.property('error').which.contains('not found');
      });
  });
});

describe('GET /movies', function() {
  let app;
  const movies = [];
  const movieTitles = ['Iron Man', 'Ant-Man'];

  // Before testing create some resources
  before(() => {
    app = require('../src/server');
    const promises = movieTitles.map((title) =>
      chai
        .request(app)
        .post('/movies')
        .send({ title })
    );
    return Promise.all(promises).then((responses) => {
      responses.forEach((response) => movies.push(response.body));
    });
  });

  // clear resources created by this test suite
  after(() => {
    const Movie = app.db.models.Movie;
    return Movie.truncate({ force: true }).then(() => {
      //ensure that database is empty
      return Movie.findAll().then((movies) => movies.should.have.lengthOf(0));
    });
  });

  it('Should return movies in the database', () => {
    return chai
      .request(app)
      .get('/movies')
      .then((response) => {
        response.should.have.status(200);
        response.body.should.have.property('count').equal(2);
        response.body.should.have.property('movies').that.has.lengthOf(2);
        for (let i = 0; i < 2; i++) response.body.movies[i].should.have.property('Title').which.is.oneOf(movieTitles);
      });
  });

  it('Getting movie by title should return only that movie', () => {
    return chai
      .request(app)
      .get('/movies')
      .query({ title: movieTitles[0] })
      .then((response) => {
        response.should.have.status(200);
        response.body.should.have.property('Title').which.equals(movieTitles[0]);
      });
  });

  it('Getting movie by id should return that movie', () => {
    return chai
      .request(app)
      .get('/movies')
      .query({ id: movies[0].id })
      .then((response) => {
        response.should.have.status(200);
        response.body.should.have.property('id').which.is.equal(movies[0].id);
      });
  });
});
