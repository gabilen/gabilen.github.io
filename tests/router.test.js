define([
    'chai',
    'core/router',
    'sinon'
], function (chai, Router, sinon) {
    var expect = chai.expect;
    var assert = chai.assert;
    
    describe('Router', function () {
        describe('when(url, callback)', function () {
            var router = new Router();
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
                expect(router._routes[0].callback).to.be.instanceof(Function);
                expect(router._routes[0].callback.apply(null)).to.equal(123);
            });
        });
        describe('start()', function () {
            var router = new Router();
            it('router._on should be true', function () {
                expect(router._on).to.be.false;
                router.start();
                expect(router._on).to.be.true;
				router.stop();
            });				
			it('router.checkState function must run once', function () {
				var spy = sinon.spy(router, "checkState");
				router.start();
				assert.equal(true, router.checkState.calledOnce, 'checkState function must run');
				router.checkState.restore();
				router.stop();
            });
        });
        describe('checkState()', function () {
            var router = new Router();
            var callback = function (name, id) {
            	return name + '_' + id;
        	};
            router.when('/#test2/:name/:id', callback);			
            it('should run callback function', function () {
				var stub = sinon.stub(router, "getHash", function() {
					return '#test2/Victor/7';
				});
                router.start();
				assert.equal('Victor_7', router.checkState(), 'must run callback of tested url');
				router.getHash.restore();
				router.stop();
            });
        });
        describe('remove(url)', function () {
            var router = new Router();
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
            var router = new Router();
            it('router._on should be false', function () {
                router.start();
                expect(router._on).to.be.true;
                router.stop();
                expect(router._on).to.be.false;
            });
        });
    });
});