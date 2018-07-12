const path = require('path');

module.exports = function(seq, datatypes) {
  const Comment = seq.define(
    'Comment',
    {
      id: { type: datatypes.UUID, defaultValue: datatypes.UUIDV4, primaryKey: true },
      comment: { type: datatypes.TEXT },
    },
    {
      freezeTableName: true,
      tableName: 'comments',
      updatedAt: false,
      comment: 'Comments for movies',
    }
  );

  const Movie = seq.import(path.join(__dirname, 'movie.js'));

  Comment.belongsTo(Movie, { as: 'movie', foreignKey: 'movieId' });

  return Comment;
};
