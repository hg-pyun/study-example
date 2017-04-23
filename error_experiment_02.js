const express = require('express');
let app = express();

// router
app.get('/', function (req, res, next) {
    error;
    next('error occur!!');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Something broke!');
});

app.listen(3000, function () {
    console.log('http://localhost:3000/');
});

