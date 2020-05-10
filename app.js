const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./apps-data.js');

app.get('/apps', (req, res) => {
  const { search = "", sort } = req.query;

  if (sort) {
    if (!['App', 'Rating'].includes(sort)) {
      return res
        .status(400)
        .send(`Sort must be either 'app' or 'rating'`);
    }
  }

  

  let results = apps
    .filter(appName =>
      appName
        .App
        .toLowerCase()
        .includes(search.toLowerCase())
  );

    if (sort) {
      results.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }

  res.json(results);
})

app.listen(8100, () => {
  console.log('Server started on port 8100');
})