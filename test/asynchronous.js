describe('async', function() {

    // 비동기 함수를 테스트한다.
    // 기본 타임아웃 시간은 2000ms 이다.
    it('async without timeout', function(done) {
        setTimeout(function (err) {
            if (err) done(err);
            else done();
        }, 1000)
    });

    it('async with timeout', function(done) {
        setTimeout(function (err) {
            if (err) done(err);
            else done();
        }, 3000)
    });
});