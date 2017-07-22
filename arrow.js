let subjects = ["math", "english", "korean",];

let lengthArray = subjects.map(function(s){ return s.length });
let lengthArray2 = subjects.map( s => s.length );

console.log(lengthArray);  // [ 4, 7, 6 ]
console.log(lengthArray2); // [ 4, 7, 6 ]