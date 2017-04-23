const express = require('express');
let app = express();


// error handler 01
app.use(function (err, req, res, next) {
    console.error('error handler 01', err);
    res.status(500).send('Something broke!');
});

// router
app.get('/', function (req, res, next) {
    next('error occur!!');
});

// error handler 02
app.use(function (err, req, res, next) {
    console.error('error handler 02', err);
    res.status(500).send('Something broke!');
});

// error handler 03
app.use(function (err, req, res, next) {
    console.error('error handler 03', err);
    res.status(500).send('Something broke!');
});

app.listen(3000, function () {
    console.log('http://localhost:3000/');
});
