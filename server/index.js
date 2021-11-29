const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const logger = require('morgan');
const timeout = require('connect-timeout');
const { cors, setApiHeaders } = require('./middleware');
const routes = require('./routes');

const app = express();
let port = process.env.PORT || 9001;

// set timeout to simulate request delay
app.use(timeout('5s'));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../build')));
app.get('/build', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.use(setApiHeaders());
app.use('/api/', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
