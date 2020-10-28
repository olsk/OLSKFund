const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKFund_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKFundLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKFundLauncherFakeItemProxy', 1);
	});

	it('shows OLSKFundLauncherItemEnterConfirmation', function () {
		return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemEnterConfirmation', 1);
	});

	it('hides OLSKFundLauncherItemClearAuthorization', function () {
		return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearAuthorization', 0);
	});

	context('GrantAuthorized', function () {

		before(function () {
			return browser.pressButton('#TestFakeGrantAuthorized');
		});

		it('hides OLSKFundLauncherItemEnterConfirmation', function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemEnterConfirmation', 0);
		});		

		it('shows OLSKFundLauncherItemClearAuthorization', function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearAuthorization', 1);
		});		

	});

});
