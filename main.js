const OLSKPact = require('OLSKPact');

const uPromise = function (inputData) {
	if (inputData instanceof Promise) {
		return inputData;
	}

	return {
		then (res) {
			return res(inputData);
		},
	};
};

const mod = {

	_OLSKFundSetupPostPay (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.ParamDispatchPersist !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const confirmation = Object.fromEntries((new URLSearchParams(params.ParamWindow.location.hash.slice(1))).entries()).confirmation;

		if (!confirmation) {
			return
		}

		if (params.ParamExistingCode) {
			return;
		}

		return params.ParamDispatchPersist(confirmation);
	},

	async _OLSKFundSetupGrant (params) {
		if (typeof params !== 'object' || params === null) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (!params.ParamWindow.location) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}
		
		if (typeof params.ParamURL !== 'string') {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}
		
		if (OLSKPact.OLSKPactAuthModelErrors(params.ParamBody)) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (OLSKPact.OLSKPactPayModelErrors(params.ParamBody)) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (typeof params.ParamLocalize !== 'function') {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (typeof params.ParamDispatchGrant !== 'function') {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (!params.ParamWindow.indexedDB) {
			return;
		}

		const grant = await this._DataFoilIDBKeyVal.get('OLSKFundGrant', new this._DataFoilIDBKeyVal.Store('OLSK', 'OLSK'));

		if (grant) {
			return params.ParamDispatchGrant(JSON.parse(grant));
		}

		let response;

		try {
			response = params.ParamWindow.fetch(params.ParamURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params.ParamBody),
			});
		} catch (error) {
			return params.ParamWindow.alert(params.ParamLocalize('OLSKFundGrantErrorConnection'));
		}

		const json = (function(inputData) {
			for (const key in inputData) {
				if (key.slice(-4) === 'Date') {
					inputData[key] = new Date(inputData[key]);
				}
			}

			return inputData;
		})(await response.json());

		if (response.status !== 200) {
			return params.ParamWindow.alert(json.RCSAPIError);
		}

		if (json.OLSKPactGrantEndDate < new Date()) {
			return params.ParamWindow.alert(params.ParamLocalize('OLSKFundGrantErrorExpired'));
		}

		this._DataFoilIDBKeyVal.set('OLSKFundGrant', JSON.stringify(json), new this._DataFoilIDBKeyVal.Store('OLSK', 'OLSK'));
	},

	OLSKFundSetup (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamNavigator.platform !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamNavigator.serviceWorker) {
			return;
		}

		const _this = this;

		return uPromise(_this._OLSKFundSetupPostPay()).then(function () {
			_this._OLSKFundSetupGrant();
		});
	},

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

	// DATA

	_DataFoilIDBKeyVal: require('idb-keyval'),

};

Object.assign(exports, mod);
