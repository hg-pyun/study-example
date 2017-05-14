describe('timeout', function() {
    this.timeout(500);

    it('should take less than 500ms', function(done){
        setTimeout(done, 300);
    });

    it('should take more than 500ms', function(done){
        setTimeout(done, 600);
    });
});