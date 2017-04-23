const express = require('express');
let app = express();

app.use(function (req, res, next) {
    next('request error');
});

app.use(logErrorHandler);
app.use(requestErrorHandler);

function logErrorHandler(err, req, res, next) {
    console.log('logErrorHandler', 'record :', err);
    next(err);
}

function requestErrorHandler(err, req, res, next) {
    console.error('requestErrorHandler', err);
    res.status(500).send('send error response');
}

app.listen(3000, function () {
    console.log('http://localhost:3000/');
});

// result
// logErrorHandler record : request error
// requestErrorHandler request error