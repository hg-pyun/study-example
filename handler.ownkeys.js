var p = new Proxy({}, {
    ownKeys: function(target) {
        console.log('called');
        return ['a', 'b', 'c'];
    }
});

console.log(Object.getOwnPropertyNames(p)); // "called"
                                            // [ 'a', 'b', 'c' ]