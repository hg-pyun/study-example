// 과목을 저장
let subjects = ['math', 'english', 'korean'];

// 대문자로 변경
function makeUpperCase(word) {
    return word.toUpperCase();
}

// loop
let loopResult = [];
for (let i = 0; i < subjects.length; i++) {
    loopResult.push(makeUpperCase(subjects[i]));
}
console.log(loopResult);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]

// functional
let funcResult = subjects.map(makeUpperCase);   // Array.prototype.map.call(subjects, makeUpperCase);
console.log(funcResult);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]