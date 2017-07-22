// 과목을 저장
let subjects = ['math', 'english', 'korean'];

// 대문자로 변경
function makeUpperCase(word) {
    return word.toUpperCase();
}

// // loop
// let result = [];
// for (let i = 0; i < subjects.length; i++) {
//     result.push(makeUpperCase(subjects[i]));
// }
// console.log(result);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]

let result = subjects.map(makeUpperCase);   // Array.prototype.map.call(subjects, makeUpperCase);
console.log(result);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]