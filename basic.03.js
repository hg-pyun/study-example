let sum = x => y => x + y;
let sum5 = sum(5);
let sum12 = sum5(7);

console.log(sum(5)(7)); // 12 12