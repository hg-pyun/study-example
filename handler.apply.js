var p = new Proxy(function() {}, {
    apply: function(target, thisArg, argumentsList) {
        console.log('called: ' + argumentsList.join(', '));
        return argumentsList[0] + argumentsList[1] + argumentsList[2];
    }
});

console.log(p(1, 2, 3)); // "called: 1, 2, 3"
                         // 6