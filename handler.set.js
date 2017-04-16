var p = new Proxy({}, {
    set: function(target, prop, value, receiver) {
        console.log('called: ' + prop + ' = ' + value);
        return true;
    }
});

p.a = 10; // "called: a = 10"