module.exports = function(err, req, res, next) {
  if (err) {
    if (process.env.NODE_ENV !== 'test') console.log('\n' + JSON.stringify(err, null, 2));
  }

  if (err.httpcode) {
    if (err.httpcode === 500) return res.sendStatus(500);
    res.status(err.httpcode);
  }

  res.json({ error: err.message });
};
