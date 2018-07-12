const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ message: 'Server created successfully!' }));

app.listen(PORT, () => console.log(`App listening on port :${PORT}`));
