const OLSKPact = require('OLSKPact');
const OLSKCrypto = require('OLSKCrypto');

const uIsFilled = function (inputData) {
	return typeof inputData === 'string' && inputData.trim() !== '';
};

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

	OLSKFundSetup (params, debug) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamMod !== 'object' || params.ParamMod === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamFormURL !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamProject !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _this = this;

		return Object.assign(params.ParamMod, {

			_OLSKAppToolbarDispatchFundNotConnected () {
				if (!(debug.ParamWindow || window).confirm(params.OLSKLocalized('OLSKRemoteStorageConnectConfirmText'))) {
					return;
				}

				params.ParamMod._ValueCloudToolbarHidden = false;
			},

			_OLSKAppToolbarDispatchFundConnected () {
				params.ParamMod._ValueFundURL = mod.OLSKFundURL(Object.assign(Object.assign({}, params), {
					ParamIdentity: params.ParamMod._ValueCloudIdentity,
					ParamHomeURL: (debug.ParamWindow || window).location.origin + (debug.ParamWindow || window).location.pathname,
				}));

				params.ParamMod._OLSKWebView.modPublic.OLSKModalViewShow();

				return _this.OLSKFundListen({
					ParamWindow: (debug.ParamWindow || window),
					OLSKFundDispatchReceive: params.ParamMod.OLSKFundDispatchReceive,
				});
			},

			OLSKFundDispatchProgress (inputData) {
				params.ParamMod._ValueOLSKFundProgress = inputData;
			},

			OLSKFundDispatchFail () {
				return params.ParamMod.OLSKFundDispatchPersist(null);
			},

			OLSKFundDispatchReceive (inputData) {
				params.ParamMod._OLSKWebView.modPublic.OLSKModalViewClose();

				params.ParamMod._ValueFundClue = inputData;

				return params.ParamMod.OLSKFundDispatchPersist(inputData);
			},

			OLSKAppToolbarDispatchFund () {
				return params.ParamMod[params.ParamMod._ValueCloudIdentity ? '_OLSKAppToolbarDispatchFundConnected' : '_OLSKAppToolbarDispatchFundNotConnected']();
			},

		});
	},

	OLSKFundResponseIsPresent () {
		return !!this._DataFoilOLSKLocalStorage.OLKSLocalStorageGet(typeof window === 'undefined' ? null : window.localStorage, mod._OLSKFundGrantData())
	},

	OLSKFundSetupPostPay (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.ParamExistingClue === 'undefined') {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKFundDispatchPersist !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const clue = Object.fromEntries((new URLSearchParams(params.ParamWindow.location.hash.replace(/^#+/, ''))).entries()).clue;

		if (!clue) {
			return
		}

		params.ParamWindow.location.hash = '';

		if (params.ParamExistingClue) {
			return;
		}

		return params.OLSKFundDispatchPersist(clue);
	},

	_OLSKFundGrantData () {
		return 'OLSK_FUND_GRANT_DATA';
	},

	async _OLSKFundSetupGrantDispatchPayload (params, payload) {
		try {
			return params.OLSKFundDispatchGrant(JSON.parse(await OLSKCrypto.OLSKCryptoDecryptSigned(params.OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE, params.OLSK_CRYPTO_PAIR_SENDER_PUBLIC, payload.OLSK_FUND_GRANT_V1)));
		} catch (e) {
			if (e.message.match('Invalid RSA private key')) {
				return params.ParamWindow.alert(params.OLSKLocalized('OLSKFundGrantErrorDecryptionText'));
			}

			if (e.message.match('OLSKErrorNotSigned')) {
				return params.ParamWindow.alert(params.OLSKLocalized('OLSKFundGrantErrorSigningText'));
			}
			
			throw e;
		}
	},

	async OLSKFundSetupGrant (params) {
		if (typeof params !== 'object' || params === null) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (!uIsFilled(params.OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE)) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (!uIsFilled(params.OLSK_CRYPTO_PAIR_SENDER_PUBLIC)) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (!params.ParamWindow.location) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}
		
		if (typeof params.OLSK_FUND_API_URL !== 'string') {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (OLSKPact.OLSKPactAuthModelErrors(params.ParamBody)) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (OLSKPact.OLSKPactPayModelErrors(params.ParamBody)) {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (typeof params.OLSKLocalized !== 'function') {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (typeof params.OLSKFundDispatchProgress !== 'function') {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (typeof params.OLSKFundDispatchFail !== 'function') {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		if (typeof params.OLSKFundDispatchGrant !== 'function') {
			return Promise.reject(new Error('OLSKErrorInputNotValid'));
		}

		const payload = params.ParamSpecUI ? null : await this._DataFoilOLSKLocalStorage.OLKSLocalStorageGet(params.ParamWindow.localStorage, mod._OLSKFundGrantData());
		if (payload) {
			return mod._OLSKFundSetupGrantDispatchPayload(params, payload);
		}

		let response;

		try {
			params.OLSKFundDispatchProgress(true);
			
			response = await params.ParamWindow.fetch(params.OLSK_FUND_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(params.ParamBody),
			});
		} catch (error) {
			return params.ParamWindow.alert(params.OLSKLocalized('OLSKFundGrantErrorConnectionText'));
		}

		const json = await response.json();

		params.OLSKFundDispatchProgress(false);

		if (response.status !== 200) {
			return params.OLSKFundDispatchFail(params.ParamWindow.alert(json.RCSAPIError));
		}

		return mod._OLSKFundSetupGrantDispatchPayload(params, await this._DataFoilOLSKLocalStorage.OLKSLocalStorageSet(params.ParamWindow.localStorage, mod._OLSKFundGrantData(), json));
	},

	OLSKFundGate (param1, OLSKLocalized) {
		if (!param1.location) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1.confirm(OLSKLocalized('OLSKFundGateText'));
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

	OLSKFundListen (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.OLSKFundDispatchReceive !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return params.ParamWindow.addEventListener('message', function (event) {
			if (typeof event.data !== 'object' || event.data === null) {
				return;
			}

			if (!event.data.OLSK_FUND_CLUE) {
				return;
			}

			return params.OLSKFundDispatchReceive(event.data.OLSK_FUND_CLUE);
		}, false);
	},

	_OLSKFundPricingDate (inputData) {
		const string = inputData.split(':').slice(0, -1).join(':');

		const outputData = new Date(string);
		return Number.isNaN(outputData.getTime()) ? new Date(parseInt(string)) : outputData;
	},

	_OLSKFundPricingStringRowErrors (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (inputData.slice(-1) === ';') {
			return true;
		}

		if (inputData.split(':').length < 2) {
			return true;
		}

		if (Number.isNaN(mod._OLSKFundPricingDate(inputData).getTime())) {
			return true;
		}

		if (inputData.split(':').pop().split(' ').length !== 4) {
			return true;
		}

		return false;
	},

	OLSKFundPricingStringIsValid (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const rows = inputData.split(';');

		if (!rows.length) {
			return false;
		}

		if (rows.filter(mod._OLSKFundPricingStringRowErrors).length) {
			return false;
		}

		return true;
	},

	OLSKFundTier (param1, param2) {
		if (!mod.OLSKFundPricingStringIsValid(param1)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (param2 && OLSKPact.OLSKPactGrantModelErrors(param2)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!param2) {
			return 0;
		}

		const pricing = param1.split(';').filter(function (e) {
			return e;
		}).map(function (e) {
			return {
				OLKSFundPricingDate: mod._OLSKFundPricingDate(e),
				OLKSFundPricingYearlySums: e.split(':').pop().split(' ').map(function (e, i) {
					return e.split(',').map(function (e, index, original) {
						return parseInt(e) * 100 * (i && original.length == 1 ? 12 : 1);
					}).pop();
				}),
			};
		});

		return pricing.filter(function (e) {
			return param2.OLSKPactGrantStartDate <= e.OLKSFundPricingDate;
		}).concat(pricing.slice(-1)).shift().OLKSFundPricingYearlySums.filter(function (e) {
			return (param2.OLSKPactGrantContribution * (param2.OLSKPactGrantFrequencyOption === OLSKPact.OLSKPactGrantFrequencyOptionMonthly() ? 12 : 1)) >= e;
		}).length + 1;
	},

	OLSKFundIsEligible (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamMinimumTier !== 'number') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamCurrentProject !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!Array.isArray(params.ParamBundleProjects)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamGrantTier !== 'number') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamGrantProject !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (params.ParamGrantTier < params.ParamMinimumTier) {
			return false;
		}

		if (params.ParamGrantTier > params.ParamMinimumTier) {
			return true;
		}

		if (params.ParamGrantProject === params.ParamCurrentProject) {
			return params.ParamGrantTier === params.ParamMinimumTier;
		}

		if (params.ParamGrantTier === 2) {
			return params.ParamBundleProjects.includes(params.ParamGrantProject);
		}

		if (params.ParamGrantTier > 2) {
			return true;
		}

		return false;
	},

	OLSKFundRemainder (param1, param2) {
		if (typeof param1 !== 'number') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'number') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (param2 < 1) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return Math.max(0, param2 - param1);
	},

	async _OLSKFundFakeGrantResponseEncrypted (param1, param2, param3) {
		return mod._DataFoilOLSKLocalStorage.OLKSLocalStorageSet(window.localStorage, mod._OLSKFundGrantData(), await OLSKCrypto.OLSKCryptoEncryptSigned(param1, param2, JSON.stringify(param3)));
	},

	_OLSKFundFakeGrantResponseRandom () {
		return mod._DataFoilOLSKLocalStorage.OLKSLocalStorageSet(localStorage, mod._OLSKFundGrantData(), Math.random().toString());
	},

	OLSKFundLauncherFakeItemProxy () {
		return {
			LCHRecipeName: 'OLSKFundLauncherFakeItemProxy',
			LCHRecipeCallback () {},
		};
	},

	OLSKFundLauncherItemFakeFlipProgress (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'OLSKFundLauncherItemFakeFlipProgress',
			LCHRecipeCallback () {
				return inputData.OLSKFundDispatchProgress(!inputData._ValueOLSKFundProgress);
			},
		};
	},

	OLSKFundLauncherItemFakeTier2WithNoBundle (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'OLSKFundLauncherItemFakeTier2WithNoBundle',
			LCHRecipeCallback () {
				inputData._ValueOLSKFundGrant = OLSKPact.OLSKPactDataGrantObjectValid({
					OLSKPactGrantContribution: 1000,
					OLSKPactGrantFrequencyOption: OLSKPact.OLSKPactGrantFrequencyOptionYearly(),
				});
			},
		};
	},

	OLSKFundLauncherItemFakeTier2WithBundle (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'OLSKFundLauncherItemFakeTier2WithBundle',
			LCHRecipeCallback () {
				inputData._ValueOLSKFundGrant = OLSKPact.OLSKPactDataGrantObjectValid({
					OLSKPactGrantContribution: 1000,
					OLSKPactGrantFrequencyOption: OLSKPact.OLSKPactGrantFrequencyOptionYearly(),
					OLSKPactGrantProject: 'FakeBundleProject',
				});
			},
		};
	},

	OLSKFundLauncherItemFakeTier2Proxy (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeName: 'OLSKFundLauncherItemFakeTier2Proxy',
			LCHRecipeCallback () {},
			LCHRecipeIsExcluded () {
				return !inputData.DataIsEligible({
					ParamMinimumTier: 2,
				});
			}
		};
	},

	OLSKFundLauncherItemEnterClue (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamConnected !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamAuthorized !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.OLSKFundDispatchPersist !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _this = this;

		return {
			LCHRecipeSignature: 'OLSKFundLauncherItemEnterClue',
			LCHRecipeName: params.OLSKLocalized('OLSKFundLauncherItemEnterClueText'),
			LCHRecipeCallback () {
				const item = (params.ParamWindow.prompt(params.OLSKLocalized('OLSKFundLauncherItemEnterCluePromptText')) || '').trim();

				if (!item) {
					return;
				}

				_this._DataFoilOLSKLocalStorage.OLKSLocalStorageSet(params.ParamWindow.localStorage, mod._OLSKFundGrantData(), null);

				return params.OLSKFundDispatchPersist(item);
			},
			LCHRecipeIsExcluded () {
				return !params.ParamConnected || params.ParamAuthorized;
			},
		};
	},

	OLSKFundLauncherItemClearClue (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamConnected !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamAuthorized !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.OLSKFundDispatchGrant !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.OLSKFundDispatchPersist !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _this = this;

		return {
			LCHRecipeSignature: 'OLSKFundLauncherItemClearClue',
			LCHRecipeName: params.OLSKLocalized('OLSKFundLauncherItemClearClueText'),
			LCHRecipeCallback () {
				if (!params.ParamWindow.confirm(params.OLSKLocalized('OLSKFundLauncherItemClearClueConfirmText'))) {
					return;
				}

				return params.OLSKFundDispatchPersist(params.OLSKFundDispatchGrant(_this._DataFoilOLSKLocalStorage.OLKSLocalStorageSet(params.ParamWindow.localStorage, mod._OLSKFundGrantData(), null)));
			},
			LCHRecipeIsExcluded () {
				return !params.ParamConnected || !params.ParamAuthorized;
			},
		};
	},

	OLSKFundRecipes (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamMod !== 'object' || params.ParamMod === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamSpecUI !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return [
			mod.OLSKFundLauncherFakeItemProxy(),
			mod.OLSKFundLauncherItemFakeFlipProgress(params.ParamMod),
			mod.OLSKFundLauncherItemFakeTier2WithNoBundle(params.ParamMod),
			mod.OLSKFundLauncherItemFakeTier2WithBundle(params.ParamMod),
			mod.OLSKFundLauncherItemFakeTier2Proxy(params.ParamMod),
			mod.OLSKFundLauncherItemEnterClue(params),
			mod.OLSKFundLauncherItemClearClue(params),
		].filter(function (e) {
			if (params.ParamSpecUI) {
				return true;
			}

			return !(e.LCHRecipeSignature || e.LCHRecipeName).match(/Fake/);
		});
	},

	// DATA

	_DataFoilOLSKLocalStorage: require('OLSKLocalStorage'),

};

Object.assign(exports, mod);
