define([
    'chai',
    'core/Logger',
    'sinon'
], function(chai, LOGGER, sinon) {
    describe('LOGGER', function() {
        it('log()', function() {
            sinon.stub(console, 'log', function(text, color) {
                chai.expect(text).to.eql('Test: logger');
                chai.expect(color).to.be.undefined;
            });
            LOGGER.log('logger', 'Test');
            console.log.restore();
        });
    });
});