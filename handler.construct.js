var p = new Proxy(function() {}, {
    construct: function(target, argumentsList, newTarget) {
        console.log('called: ' + argumentsList.join(', '));
        return { value: argumentsList[0] * 10 };
    }
});

console.log(new p(1, 2, 3).value); // "called: 1, 2, 3"
                                   // 10