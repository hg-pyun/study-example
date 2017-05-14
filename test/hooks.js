const assert = require('assert');

describe('hooks', function() {

    before(function() {
        // 모든 테스트 실행 전 한번만 실행
    });

    after(function() {
        // 모든 테스트 실행 후 한번만 실행
    });

    beforeEach(function() {
       // 각각의 테스트 실행 전 실행
    });

    afterEach(function() {
        // 각각의 테스트 실행 후 실행
    });

    // test cases
    it('test case 1', function () {

    });

    it('test case 2', function () {

    });
});