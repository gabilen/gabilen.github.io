define([
    'chai',
    'core/router',
    'sinon'
], function (chai, Router, sinon) {
    var expect = chai.expect;
    var assert = chai.assert;
    
    describe('Router', function () {
        var router = new Router();
        
        describe('when(url, callback)', function () {
            var callback = function () {
                return 123;
            };
            router.when('/#test', callback);
            
            it('router._routes should be an array with length 1', function () {
                expect(router._routes).to.be.instanceOf(Array);
                expect(router._routes).have.length(1);
            });            
            it('router._routes array[0] should be an object', function () {
                expect(router._routes[0]).to.be.instanceOf(Object);
            });         
            it('router._routes array[0].url should be equal "/#test"', function () {
                expect(router._routes[0].url).to.equal("/#test");
            });         
            it('router._routes array[0].pattern should be deep equal /^\/#test$/', function () {
                expect(router._routes[0].pattern).to.deep.equal(/^\/#test$/);
            });    
            it('router._routes array[0].callback should be a function', function () {
                expect(router._routes[0].callback).to.be.instanceof(Function); // isFunction ?
//                assert.isFunction(callback);
//                assert.isFunction(router._routes[0].callback);
            });
            
        });
        
        describe('start()', function () {
            it('router._on should be true', function () {
                expect(router._on).to.be.false;
                router.start();
                expect(router._on).to.be.true;
            });
        });
        
        describe('checkState()', function () {
            it('should run callback function', function () {
                expect(1).to.be.false;
            });
        });
        
        describe('remove(url)', function () {
            it('existed route will be removed', function () {
                var callback = function () {
                    return 123;
                };
                router._routes = [];
                router.when('/#remove', callback);
                expect(router._routes[0].url).to.equal("/#remove");
                router.start();
                router.remove('/#remove');
                expect(router._routes).to.be.empty;
            });
        });
        
        describe('stop()', function () {
            it('router._on should be false', function () {
                router.start();
                expect(router._on).to.be.true;
                router.stop();
                expect(router._on).to.be.false;
            });
        });
        
    });
});