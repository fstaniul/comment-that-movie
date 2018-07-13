const chai = require('chai');
chai.use(require('chai-http'));
chai.use(require('chai-arrays'));

describe('/comments', () => {
  let app;
  const movieTitles = ['Iron Man', 'Ant-Man'];
  const movies = [];

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

  after(() => {
    const Movie = app.db.models.Movie;
    const Comment = app.db.models.Comment;
    movies.splice(0, 0);

    return Promise.all([Movie.truncate(), Comment.truncate()]);
  });

  describe('POST', () => {
    it('Should create comment for movie with correct id', () => {
      const commentMsg = 'This is a comment message';
      const movieId = movies[0].id;
      return chai
        .request(app)
        .post('/comments')
        .send({ movieId, comment: commentMsg })
        .then((response) => {
          response.should.have.status(200);
          response.body.should.have.property('id');
          response.body.should.have.property('movieId').equal(movieId);
          response.body.should.have.property('createdAt');
          response.body.should.have.property('comment').equal(commentMsg);
        });
    });

    after(() => {
      return app.db.models.Comment.truncate();
    });
  });

  describe('GET', () => {
    const __comments = [];
    const commentMessages = ['This is first comment', 'Testing the comments', 'This movie was awesome!'];

    before(() => {
      const comments = movies.reduce((acc, movie) => {
        commentMessages.forEach((comment) => acc.push({ movieId: movie.id, comment }));
        return acc;
      }, []);

      const promises = comments.map((comment) =>
        chai
          .request(app)
          .post('/comments')
          .send(comment)
      );

      return Promise.all(promises).then((responses) => responses.forEach((response) => __comments.push(response.body)));
    });

    after(() => {
      return app.db.models.Comment.truncate();
    });

    it('Should return created comments', () => {
      return chai
        .request(app)
        .get('/comments')
        .then((response) => {
          response.should.have.status(200);
          response.body.should.have.property('count').equal(6);
          response.body.should.have.property('comments').that.has.lengthOf(6);
          for (let i = 0; i < 6; i++)
            response.body.comments[i].should.have.property('comment').which.is.oneOf(commentMessages);
        });
    });

    it('Should return comments filtered by movie id', () => {
      return chai
        .request(app)
        .get('/comments')
        .query({ movieId: __comments[0].movieId })
        .then((response) => {
          response.should.have.status(200);
          response.body.should.have.property('count').equal(3);
          response.body.should.have.property('comments').that.has.lengthOf(3);
          for (let i = 0; i < 3; i++)
            response.body.comments[i].should.have.property('movieId').equal(__comments[0].movieId);
        });
    });
  });
});
