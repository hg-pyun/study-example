// 과목을 저장
let subjects = ['math', 'english', 'korean'];

// 대문자로 변경
function addLength(total, word) {
    return total + word.length;
}

// loop
let loopTotal = 0;
for (let i = 0; i < subjects.length; i++) {
    let subject = subjects[i];
    loopTotal = addLength(loopTotal, subject);
}
console.log(loopTotal); // 17

// functional
let funcTotal = subjects.reduce(addLength, 0);
console.log(funcTotal);  // 17