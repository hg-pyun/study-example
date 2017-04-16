var p = new Proxy({}, {
    preventExtensions: function(target) {
        console.log('called');
        Object.preventExtensions(target);
        return true;
    }
});

console.log(Object.preventExtensions(p)); // "called"
                                          // false