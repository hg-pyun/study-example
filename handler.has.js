var p = new Proxy({}, {
    has: function(target, prop) {
        console.log('called: ' + prop);
        return true;
    }
});

console.log('a' in p); // "called: a"
                       // true