const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`OLSKFund_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes OLSKFundLauncherItemEnterConfirmation', function () {
			return browser.assert.OLSKLauncherItemText('OLSKFundLauncherItemEnterConfirmation', uLocalized('OLSKFundLauncherItemEnterConfirmationText'));
		});

		context('OLSKFundLauncherItemEnterConfirmation', function () {
			
			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			before(async function () {
				return browser.fill('.LCHLauncherFilterInput', 'OLSKFundLauncherItemEnterConfirmation');
			});
			
			it('localizes OLSKFundLauncherItemEnterConfirmationPrompt', function () {
				browser.assert.OLSKPromptQuestion(function () {
					return browser.click('.LCHLauncherPipeItem');
				}, uLocalized('OLSKFundLauncherItemEnterConfirmationPromptText'));
			});
		
		});

		context('ParamAuthorized', function () {

			before(function () {
				return browser.pressButton('#TestFakeParamAuthorized');
			});

			it('localizes OLSKFundLauncherItemClearAuthorization', function () {
				return browser.assert.OLSKLauncherItemText('OLSKFundLauncherItemClearAuthorization', uLocalized('OLSKFundLauncherItemClearAuthorizationText'));
			});

			context('OLSKFundLauncherItemClearAuthorization', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'OLSKFundLauncherItemClearAuthorization');
				});
				
				it('localizes OLSKFundLauncherItemClearAuthorizationConfirm', function () {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.click('.LCHLauncherPipeItem');
					}, uLocalized('OLSKFundLauncherItemClearAuthorizationText'));
				});
			
			});			

		});

		context('OLSKFundConfirm', function () {

			it('localizes OLSKFundConfirm', function () {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton('#TestFakeConfirm');
				}, uLocalized('OLSKFundConfirmText'));
			});
			
		});

		context('_OLSKFundSetupGrant', function () {

			it('localizes OLSKFundGrantErrorConnection', async function () {
				browser.assert.deepEqual(await browser.OLSKAlertTextAsync(function () {
					return browser.pressButton('#TestFakeErrorConnection');
				}), uLocalized('OLSKFundGrantErrorConnectionText'));
			});

			it('localizes OLSKFundGrantErrorDecryption', async function () {
				browser.assert.deepEqual(await browser.OLSKAlertTextAsync(function () {
					return browser.pressButton('#TestFakeErrorDecryption');
				}), uLocalized('OLSKFundGrantErrorDecryptionText'));
			});

			it('localizes OLSKFundGrantErrorSigning', async function () {
				browser.assert.deepEqual(await browser.OLSKAlertTextAsync(function () {
					return browser.pressButton('#TestFakeErrorSigning');
				}), uLocalized('OLSKFundGrantErrorSigningText'));
			});

			it.skip('localizes OLSKFundGrantErrorExpired', async function () {
				browser.assert.deepEqual(await browser.OLSKAlertTextAsync(function () {
					return browser.pressButton('#TestFakeErrorExpired');
				}), uLocalized('OLSKFundGrantErrorExpiredText'));
			});
			
		});

	});

});
