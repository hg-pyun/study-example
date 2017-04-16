var p = new Proxy({}, {
    get: function(target, prop, receiver) {
        console.log('called: ' + prop);
        return 10;
    }
});

console.log(p.a); // "called: a"
                  // 10