// 과목 이름, 점수 데이터
let subjects =
    [{
        name: 'math',
        score: 100,
    }, {
        name: 'english',
        score: 85
    }, {
        name: 'korean',
        score: 95
    }];

// 90점 이상인지 체크
function is90Over(subject) {
    return subject.score > 90;
}

// loop
let loopResult = [];
for (let i = 0; i < subjects.length; i++) {
    let subject = subjects[i];
    if(is90Over(subject)){
        loopResult.push(subjects[i]);
    }
}
console.log(loopResult);    // [ { name: 'math', score: 100 }, { name: 'korean', score: 95 } ]

// filter
let funcResult = subjects.filter(is90Over);   // Array.prototype.map.call(subjects, makeUpperCase);
console.log(funcResult);  // [ { name: 'math', score: 100 }, { name: 'korean', score: 95 } ]