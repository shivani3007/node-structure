const express = require('express')
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
require('./helpers/db.helper');
const routes = require("./routes/index");
const {errorHandler} = require("./helpers/exception.helper")
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api',routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log('port',port);
  console.log(`Example app listening on port ${port}`)
})