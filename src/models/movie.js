const isProduction = process.env.NODE_ENV === 'production';

module.exports = function(seq, datatype) {
  const Movie = seq.define(
    'Movie',
    {
      id: { type: datatype.UUID, defaultValue: datatype.UUIDV4, primaryKey: true },
      title: { type: datatype.STRING, allowNull: false },
      data: { type: idProduction ? datatype.JSONB : datatype.JSON, allowNull: false },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'movies',
      comment: 'We all love movies right?',
    }
  );

  return Movie;
};
