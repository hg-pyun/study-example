var p = new Proxy({}, {
    defineProperty: function(target, prop, descriptor) {
        console.log('called: ' + prop);
        return true;
    }
});

var desc = { configurable: true, enumerable: true, value: 10 };
Object.defineProperty(p, 'a', desc); // "called: a"