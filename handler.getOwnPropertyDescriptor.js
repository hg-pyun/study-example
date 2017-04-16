var p = new Proxy({ a: 20}, {
    getOwnPropertyDescriptor: function(target, prop) {
        console.log('called: ' + prop);
        return { configurable: true, enumerable: true, value: 10 };
    }
});

console.log(Object.getOwnPropertyDescriptor(p, 'a').value); // "called: a"
                                                            // 10