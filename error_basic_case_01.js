var express = require('express');
var app = express();

// middle ware 01
app.use(function (req, res, next) {
    console.log('middle ware 01');
    next('middle ware 01 error occur!!');  // 에러 발생 !!
});

// middle ware 02, skip 됨
app.use(function (req, res, next) {
    console.log('middle ware 02');
    next();
});

// router, skip 됨
app.get('/', function (req, res, next) {
    console.log('router');
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

// result
// middle ware 01
// middle ware 01 error occur!!