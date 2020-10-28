const mod = {

	OLSKFundConfirm (param1, OLSKLocalized) {
		if (!param1.location) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1.confirm(OLSKLocalized('OLSKFundConfirmText'));
	},

	OLSKFundURL (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamFormURL !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamProject !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamIdentity !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamHomeURL !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return Object.assign(new URL(params.ParamFormURL), {
			hash: (new URLSearchParams({
				seed: JSON.stringify({
					project: params.ParamProject,
					identity: params.ParamIdentity,
					home: params.ParamHomeURL,
				}),
			})).toString(),
		}).href;
	},

	OLSKFundLauncherFakeItemProxy () {
		return {
			LCHRecipeName: 'OLSKFundLauncherFakeItemProxy',
			LCHRecipeCallback () {},
		};
	},

	OLSKFundLauncherItemEnterConfirmation (param1, OLSKLocalized, param3) {
		if (!param1.location) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param3 !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeSignature: 'OLSKFundLauncherItemEnterConfirmation',
			LCHRecipeName: OLSKLocalized('OLSKFundLauncherItemEnterConfirmationText'),
			LCHRecipeCallback () {
				const item = param1.prompt(OLSKLocalized('OLSKFundLauncherItemEnterConfirmationPromptText'));

				if (!item) {
					return;
				}
			},
			LCHRecipeIsExcluded () {
				return !!param3;
			},
		};
	},

	OLSKFundLauncherItemClearAuthorization (param1, OLSKLocalized, param3) {
		if (!param1.location) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param3 !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeSignature: 'OLSKFundLauncherItemClearAuthorization',
			LCHRecipeName: OLSKLocalized('OLSKFundLauncherItemClearAuthorizationText'),
			LCHRecipeCallback () {
				if (!param1.confirm(OLSKLocalized('OLSKFundLauncherItemClearAuthorizationText'))) {
					return;
				}
			},
			LCHRecipeIsExcluded () {
				return !param3;
			},
		};
	},

	OLSKFundRecipes (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.WindowObject.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.GrantAuthorized !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.OLSK_TESTING_BEHAVIOUR !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return [
			mod.OLSKFundLauncherFakeItemProxy(),
			mod.OLSKFundLauncherItemEnterConfirmation(params.WindowObject, params.OLSKLocalized, params.GrantAuthorized),
			mod.OLSKFundLauncherItemClearAuthorization(params.WindowObject, params.OLSKLocalized, params.GrantAuthorized),
		].filter(function (e) {
			if (params.OLSK_TESTING_BEHAVIOUR) {
				return true;
			}

			return !(e.LCHRecipeSignature || e.LCHRecipeName).match(/Fake/);
		});
	},

};

Object.assign(exports, mod);
