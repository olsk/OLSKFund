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
			browser.assert.text('#TestOLSKFundDispatchConfirm', '0');
			browser.assert.text('#TestOLSKFundDispatchConfirmData', 'undefined');
		});
		
		before(function () {
			browser.evaluate(`window.postMessage({
				OLSK_FUND_CONFIRMATION_CODE: ${ item },
			}, window.location.href)`);
		});

		it('sends OLSKFundDispatchConfirm', function () {
			browser.assert.text('#TestOLSKFundDispatchConfirm', '1');
			browser.assert.text('#TestOLSKFundDispatchConfirmData', item);
		});
	
	});

});
