const express = require('express');
let app = express();

// error handler
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Something broke!');
});

// router
app.get('/', function (req, res, next) {
    next('error occur!!');
});

app.listen(3000, function () {
    console.log('http://localhost:3000/');
});
