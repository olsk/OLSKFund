const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const uWindow = function (inputData = {}) {
	return Object.assign({
		prompt () {},
		confirm () {},
		location: {
			reload () {},
		},
	}, inputData);
};

const uLocalized = function (inputData) {
	return inputData + 'LOCALIZED';
};

describe('OLSKFundLauncherFakeItemProxy', function test_OLSKFundLauncherFakeItemProxy() {

	it('returns object', function () {
		const item = mod.OLSKFundLauncherFakeItemProxy();
		deepEqual(item, {
			LCHRecipeName: 'OLSKFundLauncherFakeItemProxy',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {
		
		it('returns undefined', function () {
			deepEqual(mod.OLSKFundLauncherFakeItemProxy().LCHRecipeCallback(), undefined);
		});

	});

});

describe('OLSKFundLauncherItemEnterConfirmation', function test_OLSKFundLauncherItemEnterConfirmation() {

	it('throws if param1 not window', function () {
		throws(function () {
			mod.OLSKFundLauncherItemEnterConfirmation({}, uLocalized, true);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not OLSKLocalized', function () {
		throws(function () {
			mod.OLSKFundLauncherItemEnterConfirmation(uWindow(), null, true);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param3 not OLSKLocalized', function () {
		throws(function () {
			mod.OLSKFundLauncherItemEnterConfirmation(uWindow(), uLocalized, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.OLSKFundLauncherItemEnterConfirmation(uWindow(), uLocalized, true);

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKFundLauncherItemEnterConfirmation',
			LCHRecipeName: uLocalized('OLSKFundLauncherItemEnterConfirmationText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
			LCHRecipeIsExcluded: item.LCHRecipeIsExcluded,
		});
	});

	context('LCHRecipeCallback', function () {

		it('returns undefined', function () {
			deepEqual(mod.OLSKFundLauncherItemEnterConfirmation(uWindow(), uLocalized, true).LCHRecipeCallback(), undefined);
		});

		it('calls window.prompt', function () {
			const item = [];

			mod.OLSKFundLauncherItemEnterConfirmation(uWindow({
				prompt () {
					item.push(...arguments);
				},
			}), uLocalized, true).LCHRecipeCallback();

			deepEqual(item, [uLocalized('OLSKFundLauncherItemEnterConfirmationPromptText')]);
		});

	});

	context('LCHRecipeIsExcluded', function () {

		it('returns true if param3 true', function () {
			deepEqual(mod.OLSKFundLauncherItemEnterConfirmation(uWindow(), uLocalized, true).LCHRecipeIsExcluded(), true);
		});

		it('returns false', function () {
			deepEqual(mod.OLSKFundLauncherItemEnterConfirmation(uWindow(), uLocalized, false).LCHRecipeIsExcluded(), false);
		});

	});

});

describe('OLSKFundLauncherItemClearAuthorization', function test_OLSKFundLauncherItemClearAuthorization() {

	it('throws if param1 not window', function () {
		throws(function () {
			mod.OLSKFundLauncherItemClearAuthorization({}, uLocalized, true);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not OLSKLocalized', function () {
		throws(function () {
			mod.OLSKFundLauncherItemClearAuthorization(uWindow(), null, true);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param3 not boolean', function () {
		throws(function () {
			mod.OLSKFundLauncherItemClearAuthorization(uWindow(), uLocalized, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.OLSKFundLauncherItemClearAuthorization(uWindow(), uLocalized, true);

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKFundLauncherItemClearAuthorization',
			LCHRecipeName: uLocalized('OLSKFundLauncherItemClearAuthorizationText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
			LCHRecipeIsExcluded: item.LCHRecipeIsExcluded,
		});
	});

	context('LCHRecipeCallback', function () {

		it('returns undefined', function () {
			deepEqual(mod.OLSKFundLauncherItemClearAuthorization(uWindow(), uLocalized, true).LCHRecipeCallback(), undefined);
		});

		it('calls window.confirm', function () {
			const item = [];

			mod.OLSKFundLauncherItemClearAuthorization(uWindow({
				confirm () {
					item.push(...arguments);
				},
			}), uLocalized, true).LCHRecipeCallback();

			deepEqual(item, [uLocalized('OLSKFundLauncherItemClearAuthorizationText')]);
		});

	});

	context('LCHRecipeIsExcluded', function () {

		it('returns true if param3 false', function () {
			deepEqual(mod.OLSKFundLauncherItemClearAuthorization(uWindow(), uLocalized, false).LCHRecipeIsExcluded(), true);
		});

		it('returns false', function () {
			deepEqual(mod.OLSKFundLauncherItemClearAuthorization(uWindow(), uLocalized, true).LCHRecipeIsExcluded(), false);
		});

	});

});

describe('OLSKFundRecipes', function test_OLSKFundRecipes() {

	const _OLSKFundRecipes = function (inputData = {}) {
		return mod.OLSKFundRecipes(Object.assign({
			WindowObject: uWindow(),
			OLSKLocalized: uLocalized,
			GrantAuthorized: true,
			OLSK_TESTING_BEHAVIOUR: false,
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundRecipes(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if WindowObject not window', function () {
		throws(function () {
			_OLSKFundRecipes({
				WindowObject: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKFundRecipes({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if GrantAuthorized not boolean', function () {
		throws(function () {
			_OLSKFundRecipes({
				GrantAuthorized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSK_TESTING_BEHAVIOUR not boolean', function () {
		throws(function () {
			_OLSKFundRecipes({
				OLSK_TESTING_BEHAVIOUR: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns producton recipes', function () {
		deepEqual(_OLSKFundRecipes().map(function (e) {
			return e.LCHRecipeSignature || e.LCHRecipeName;
		}), Object.keys(mod).filter(function (e) {
			return e.match(/Launcher/) && !e.match(/Fake/);
		}));
	});

	context('OLSK_IS_TESTING_BEHAVIOUR', function () {

		it('returns all recipes if true', function () {
			deepEqual(_OLSKFundRecipes({
				OLSK_TESTING_BEHAVIOUR: true,
			}).map(function (e) {
				return e.LCHRecipeSignature || e.LCHRecipeName;
			}), Object.keys(mod).filter(function (e) {
				return e.match(/Launcher/);
			}));
		});
	
	});

});
