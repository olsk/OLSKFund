const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKFund_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('receive_message', function test_receive_message () {
		
		const item = Math.random().toString();

		before(function () {
			return browser.pressButton('#TestFakeGate');
		});
		
		before(function () {
			browser.assert.text('#TestOLSKFundDispatchReceive', '0');
			browser.assert.text('#TestOLSKFundDispatchReceiveData', 'undefined');
		});
		
		before(function () {
			browser.evaluate(`window.postMessage({
				OLSK_FUND_CLUE: ${ item },
			}, window.location.href)`);
		});

		it('sends OLSKFundDispatchReceive', function () {
			browser.assert.text('#TestOLSKFundDispatchReceive', '1');
			browser.assert.text('#TestOLSKFundDispatchReceiveData', item);
		});
	
	});

});
