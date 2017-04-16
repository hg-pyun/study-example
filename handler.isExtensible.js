var p = new Proxy({}, {
    isExtensible: function(target) {
        console.log('called');
        return true;
    }
});

console.log(Object.isExtensible(p)); // "called"
                                     // true