'use-strict';

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json(
    {
        'strict': 'true'
    }
    ));

app.post('/', function (req, res) {
    res.send('Got a POST request');
    console.log(req.headers);
    console.log(req.body);
  });

app.listen(port, () => console.log(`Node REST service using express listening on port ${port}!`));