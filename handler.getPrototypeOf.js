var obj = {};
var proto = {};
var handler = {
    getPrototypeOf(target) {
        console.log(target === obj);   // true
        console.log(this === handler); // true
        return proto;
    }
};

var p = new Proxy(obj, handler);
console.log(Object.getPrototypeOf(p) === proto);    // true