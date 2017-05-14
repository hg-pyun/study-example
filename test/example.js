const assert = require('assert');

describe('example', function() {

    // sum (x, y)
    // 두 수를 입력 받아 결과값을 리턴하는 함수
    // x, y는 number만 받을 수 있다.
    // 허용되지 않은 값이 들어올 경우 invalid String을 return 한다.
    const sum = require('../src/sum');

    it('sum func success', function () {
        assert.equal(2 , sum(1, 1));    // basic
        assert.equal(15, sum(5, 10));   // basic 2
        assert.equal(-5, sum(5, -10));  // -가 들어올 경우
    });

    it('sum func invalid', function () {
        assert.equal('invalid', sum(1, "1"));  // string이 들어올 경우
        assert.equal('invalid', sum(1, true));  // 허용되지 않은 값이 들어올 경우
    })
});