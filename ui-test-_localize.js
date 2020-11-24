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
				browser.assert.OLSKPromptQuestion(function () {
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
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.click('.LCHLauncherPipeItem');
					}, uLocalized('OLSKFundLauncherItemClearClueText'));
				});
			
			});			

		});

		context('OLSKFundGate', function () {

			it('localizes OLSKFundGate', function () {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton('#TestFakeGate');
				}, uLocalized('OLSKFundGateText'));
			});
			
		});

		context('OLSKFundSetupGrant', function () {

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
