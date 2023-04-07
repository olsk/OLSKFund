const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('OLSKFund_Localize-' + OLSKRoutingLanguage, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes OLSKFundLauncherItemEnterClue', function () {
			return browser.assert.OLSKLauncherItemText('OLSKFundLauncherItemEnterClue', uLocalized('OLSKFundLauncherItemEnterClueText'));
		});

		context('OLSKFundLauncherItemEnterClue', function () {
			
			before(function () {
				return browser.pressButton('.OLSKAppToolbarLauncherButton');
			});

			before(async function () {
				return browser.fill('.LCHLauncherFilterInput', 'OLSKFundLauncherItemEnterClue');
			});
			
			it('localizes OLSKFundLauncherItemEnterCluePrompt', function () {
				return browser.assert.OLSKPromptQuestion(function () {
					return browser.click('.LCHLauncherPipeItem');
				}, uLocalized('OLSKFundLauncherItemEnterCluePromptText'));
			});
		
		});

		context('ParamAuthorized', function () {

			before(function () {
				return browser.pressButton('#TestFakeParamAuthorized');
			});

			it('localizes OLSKFundLauncherItemClearClue', function () {
				return browser.assert.OLSKLauncherItemText('OLSKFundLauncherItemClearClue', uLocalized('OLSKFundLauncherItemClearClueText'));
			});

			context('OLSKFundLauncherItemClearClue', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'OLSKFundLauncherItemClearClue');
				});
				
				it('localizes OLSKFundLauncherItemClearClueConfirm', function () {
					return browser.assert.OLSKConfirmQuestion(function () {
						return browser.click('.LCHLauncherPipeItem');
					}, uLocalized('OLSKFundLauncherItemClearClueConfirmText'));
				});
			
			});			

		});

		context('OLSKFundGate', function () {

			it('localizes OLSKFundGate', function () {
				return browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton('#TestFakeGate');
				}, uLocalized('OLSKFundGateText'));
			});
			
		});

		context('OLSKFundSetupGrant', function () {

			it('localizes OLSKFundGrantErrorConnection', async function () {
				return browser.assert.deepEqual(await browser.OLSKAlertAsync(function () {
					return browser.pressButton('#TestFakeErrorConnection');
				}), uLocalized('OLSKFundGrantErrorConnectionText'));
			});

			it('localizes OLSKFundGrantErrorDecryption', async function () {
				return browser.assert.deepEqual(await browser.OLSKAlertAsync(function () {
					return browser.pressButton('#TestFakeErrorDecryption');
				}), uLocalized('OLSKFundGrantErrorDecryptionText'));
			});

			it('localizes OLSKFundGrantErrorSigning', async function () {
				return browser.assert.deepEqual(await browser.OLSKAlertAsync(function () {
					return browser.pressButton('#TestFakeErrorSigning');
				}), uLocalized('OLSKFundGrantErrorSigningText'));
			});

			it.skip('localizes OLSKFundGrantErrorExpired', async function () {
				return browser.assert.deepEqual(await browser.OLSKAlertAsync(function () {
					return browser.pressButton('#TestFakeErrorExpired');
				}), uLocalized('OLSKFundGrantErrorExpiredText'));
			});
			
		});

	});

});
