let greetDeeplyCurried =
    greeting => separator => emphasis => name =>
        console.log(greeting + separator + name + emphasis);

let greetAwkwardly = greetDeeplyCurried("Hello")("...")("?");
greetAwkwardly("momo");  // Hello...momo?

let sayHello = greetDeeplyCurried("Hello")(", ");
sayHello(".")("momo");  // Hello, momo.

let askHello = sayHello("?");
askHello("momo");   // Hello, momo?