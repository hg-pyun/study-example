var p = new Proxy({}, {
    deleteProperty: function(target, prop) {
        console.log('called: ' + prop);
        return true;
    }
});

delete p.a; // "called: a"