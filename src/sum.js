module.exports = function (x, y) {
    if(typeof x === 'number' && typeof  y === 'number'){
        return x+y;
    }
    else {
        return 'invalid';
    }
};