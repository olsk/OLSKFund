const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('OLSKFund_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows OLSKFundLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKFundLauncherFakeItemProxy', 1);
	});

	it('shows OLSKFundLauncherItemEnterClue', function () {
		return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemEnterClue', 1);
	});

	it('hides OLSKFundLauncherItemClearAuthorization', function () {
		return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearAuthorization', 0);
	});

	context('ParamAuthorized', function () {

		before(function () {
			return browser.pressButton('#TestFakeParamAuthorized');
		});

		it('hides OLSKFundLauncherItemEnterClue', function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemEnterClue', 0);
		});		

		it('shows OLSKFundLauncherItemClearAuthorization', function () {
			return browser.assert.OLSKLauncherItems('OLSKFundLauncherItemClearAuthorization', 1);
		});		

	});

});
