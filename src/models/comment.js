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

  Comment.associate = function(seq) {
    const Movie = seq.models.Movie;
    Comment.belongsTo(Movie, { foreignKey: 'movieId', as: 'movie' });
  };

  return Comment;
};
