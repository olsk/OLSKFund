const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const OLSKPact = require('OLSKPact');
const OLSKCrypto = require('OLSKCrypto');

const uWindow = function (inputData = {}) {
	return Object.assign({
		prompt () {},
		confirm () {},
		location: {
			reload () {},
		},
		localStorage: {
			setItem: (function () {}),
			getItem: (function () {}),
		},
	}, inputData);
};

const uNavigator = function (inputData) {
	return Object.assign({
		platform: Math.random().toString(),
	}, inputData);
};

const uLocalized = function (inputData) {
	return inputData + '-LOCALIZED';
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

describe('_OLSKFundSetupPostPay', function test__OLSKFundSetupPostPay() {

	const __OLSKFundSetupPostPay = function (inputData = {}) {
		const item = {};

		mod._OLSKFundSetupPostPay({
			ParamWindow: inputData.ParamWindow || uWindow(Object.assign({
				location: Object.assign(new URL('https://example.com/form'), {
					hash: (new URLSearchParams(inputData.confirmation ? {
						confirmation: inputData.confirmation,
					} : {})).toString(),
				}),
			})),
			ParamExistingCode: inputData.ParamExistingCode || null,
			OLSKFundDispatchPersist: (function () {
				item.OLSKFundDispatchPersist = inputData.OLSKFundDispatchPersist ? inputData.OLSKFundDispatchPersist() :  item.OLSKFundDispatchPersist = Array.from(arguments);
			}),
		});

		return item;
	};

	it('throws if not object', function () {
		throws(function () {
			mod._OLSKFundSetupPostPay(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not valid', function () {
		throws(function () {
			__OLSKFundSetupPostPay({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamExistingCode not defined', function () {
		throws(function () {
			mod._OLSKFundSetupPostPay({
				ParamWindow: uWindow(),
				ParamExistingCode: undefined,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchPersist not function', function () {
		throws(function () {
			mod._OLSKFundSetupPostPay({
				ParamWindow: uWindow(),
				ParamExistingCode: Math.random().toString(),
				OLSKFundDispatchPersist: Math.random().toString(),
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('breaks if no code', function () {
		deepEqual(__OLSKFundSetupPostPay(), {});
	});

	it('breaks if code matches ParamExistingCode', function () {
		const ParamExistingCode = Math.random().toString();

		deepEqual(__OLSKFundSetupPostPay({
			confirmation: ParamExistingCode,
			ParamExistingCode,
		}), {});
	});

	it('breaks if ParamExistingCode different', function () {
		const ParamExistingCode = Math.random().toString();

		deepEqual(__OLSKFundSetupPostPay({
			confirmation: Math.random().toString(),
			ParamExistingCode,
		}), {});
	});

	it('clears hash', function () {
		const location = Object.assign(new URL('https://example.com/form'), {
			hash: (new URLSearchParams({
				confirmation: Math.random().toString(),
			})).toString(),
		});

		__OLSKFundSetupPostPay({
			ParamWindow: uWindow(Object.assign({
				location,
			})),
		});

		deepEqual(location.hash, '');
	});

	it('passes code to OLSKFundDispatchPersist', function () {
		const confirmation = Math.random().toString();

		deepEqual(__OLSKFundSetupPostPay({
			confirmation
		}), {
			OLSKFundDispatchPersist: [confirmation],
		});
	});

	it('returns OLSKFundDispatchPersist', function () {
		const item = Math.random().toString();

		deepEqual(__OLSKFundSetupPostPay({
			confirmation: Math.random().toString(),
			OLSKFundDispatchPersist: (function () {
				return item;
			}),
		}), {
			OLSKFundDispatchPersist: item,
		});
	});

});

describe('_OLSKFundGrantData', function test__OLSKFundGrantData() {

	it('returns string', function () {
		deepEqual(mod._OLSKFundGrantData(), 'kOLSKFundGrantData');
	});

});

describe('_OLSKFundSetupGrant', function test__OLSKFundSetupGrant() {

	const __OLSKFundSetupGrant = async function (inputData = {}) {
		const item = {};

		await Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKLocalStorage: {
				OLKSLocalStorageGet: inputData.OLKSLocalStorageGet || (function () {
					item.OLKSLocalStorageGet = Array.from(arguments);
				}),
				OLKSLocalStorageSet: inputData.OLKSLocalStorageSet || (function () {
					item.OLKSLocalStorageSet = Array.from(arguments);
					
					return Array.from(arguments).pop();
				}),
				Store: inputData.Store || (function () {
					return Array.from(arguments);
				}),
			},
		})._OLSKFundSetupGrant(Object.assign({
			ParamWindow: uWindow({
				fetch: inputData.fetch || (function () {
					item.fetch = Array.from(arguments);
					return {
						response: 200,
						json: (function () {
							return {};
						}),
					};
				}),
				alert: inputData.alert || (function () {
					item.alert = Array.from(arguments);
				}),
			}),
			OLSK_FUND_API_URL: inputData.OLSK_FUND_API_URL || Math.random().toString(),
			OLSKLocalized: uLocalized,
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: process.env.OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE,
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: process.env.OLSK_CRYPTO_PAIR_SENDER_PUBLIC,
			OLSKFundDispatchGrant: (function () {
				item.OLSKFundDispatchGrant = Array.from(arguments);
			}),
		}, inputData, {
			ParamBody: Object.assign({
				OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeEmail(),
				OLSKPactAuthIdentity: 'alfa@bravo.charlie',
				OLSKPactAuthProof: Math.random().toString(),
				OLSKPactPayIdentity: 'alfa@bravo.charlie',
				OLSKPactPayTransaction: Math.random().toString(),
			}, inputData.ParamBody || {}),
		}));
		
		return item;
	};

	it('rejects if not object', async function () {
		await rejects(mod._OLSKFundSetupGrant(null), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE not string', async function () {
		await rejects(__OLSKFundSetupGrant({
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE not filled', async function () {
		await rejects(__OLSKFundSetupGrant({
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: ' ',
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_CRYPTO_PAIR_SENDER_PUBLIC not string', async function () {
		await rejects(__OLSKFundSetupGrant({
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_CRYPTO_PAIR_SENDER_PUBLIC not filled', async function () {
		await rejects(__OLSKFundSetupGrant({
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: ' ',
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if ParamWindow not valid', async function () {
		await rejects(__OLSKFundSetupGrant({
			ParamWindow: {},
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_FUND_API_URL not string', async function () {
		await rejects(__OLSKFundSetupGrant({
			OLSK_FUND_API_URL: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if ParamBody not OLSKPactAuthModel', async function () {
		await rejects(__OLSKFundSetupGrant({
			ParamBody: {
				OLSKPactAuthProof: null,
			},
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if ParamBody not OLSKPactPayModel', async function () {
		await rejects(__OLSKFundSetupGrant({
			ParamBody: {
				OLSKPactPayTransaction: null,
			},
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSKFundDispatchGrant not function', async function () {
		await rejects(__OLSKFundSetupGrant({
			OLSKFundDispatchGrant: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSKLocalized not function', async function () {
		await rejects(__OLSKFundSetupGrant({
			OLSKLocalized: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('calls _DataFoilOLSKLocalStorage.OLKSLocalStorageGet', async function () {
		deepEqual((await __OLSKFundSetupGrant()).OLKSLocalStorageGet.slice(1), [mod._OLSKFundGrantData()]);
	});

	it('calls OLSKFundDispatchGrant if cached', async function () {
		const item = {
			alfa: Math.random().toString(),
		};
		deepEqual((await __OLSKFundSetupGrant({
			OLKSLocalStorageGet: (function () {
				return OLSKCrypto.OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, JSON.stringify(item));
			}),
		})), {
			OLSKFundDispatchGrant: [item],
		});
	});

	it('calls ParamWindow.fetch', async function () {
		const OLSK_FUND_API_URL = Math.random().toString();
		const ParamBody = {
			OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeEmail(),
			OLSKPactAuthIdentity: 'alfa@bravo.charlie',
			OLSKPactAuthProof: Math.random().toString(),
			OLSKPactPayIdentity: 'alfa@bravo.charlie',
			OLSKPactPayTransaction: Math.random().toString(),
		};

		deepEqual((await __OLSKFundSetupGrant({
			OLSK_FUND_API_URL,
			ParamBody,
		})).fetch, [OLSK_FUND_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(ParamBody),
		}]);
	});

	it('alerts if ParamWindow.fetch throws', async function () {
		deepEqual((await __OLSKFundSetupGrant({
			fetch: (function () {
				throw new Error(Math.random().toString());
			}),
		})).alert, [uLocalized('OLSKFundGrantErrorConnectionText')]);
	});

	it('alerts if ParamWindow.fetch response not 200', async function () {
		const RCSAPIError = Math.random().toString();
		deepEqual((await __OLSKFundSetupGrant({
			fetch: (function () {
				return {
					status: Date.now(),
					json: (function () {
						return {
							RCSAPIError,
						};
					}),
				};
			}),
		})).alert, [RCSAPIError]);
	});

	it('calls _DataFoilOLSKLocalStorage.OLKSLocalStorageSet', async function () {
		const OLSK_CRYPTO_ENCRYPTED_SIGNED = await OLSKCrypto.OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, Math.random().toString());
		
		deepEqual((await __OLSKFundSetupGrant({
			fetch: (function () {
				return {
					status: 200,
					json: (function () {
						return {
							OLSK_CRYPTO_ENCRYPTED_SIGNED,
						};
					}),
				};
			}),
		})).OLKSLocalStorageSet.slice(1), [mod._OLSKFundGrantData(), OLSK_CRYPTO_ENCRYPTED_SIGNED]);
	});

	it('calls OLSKFundDispatchGrant', async function () {
		const item = {
			alfa: Math.random().toString(),
		};
		deepEqual((await __OLSKFundSetupGrant({
			OLKSLocalStorageGet: (function () {}),
			OLKSLocalStorageSet: (function () {
				return Array.from(arguments).pop();
			}),
			fetch: (function () {
				return {
					status: 200,
					json: (async function () {
						return {
							OLSK_CRYPTO_ENCRYPTED_SIGNED: await OLSKCrypto.OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, JSON.stringify(item)),
						};
					}),
				};
			}),
		})), {
			OLSKFundDispatchGrant: [item],
		});
	});

});

describe('OLSKFundSetup', function test_OLSKFundSetup() {

	const _OLSKFundSetup = function (inputData = {}) {
		const item = {};

		return uPromise(Object.assign(Object.assign({}, mod), {
			_OLSKFundSetupPostPay: (function () {
				item._OLSKFundSetupPostPay = Array.from(arguments);
			}),
			_OLSKFundSetupGrant: (function () {
				item._OLSKFundSetupGrant = Array.from(arguments);
			}),
		}, inputData).OLSKFundSetup(Object.assign({
			ParamNavigator: uNavigator({
				serviceWorker: inputData.serviceWorker,
			}),
		}, inputData))).then(function () {
			return item;
		})
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundSetup(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamNavigator not valid', function () {
		throws(function () {
			_OLSKFundSetup({
				ParamNavigator: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('calls _OLSKFundSetupPostPay', function () {
		deepEqual(_OLSKFundSetup({
			serviceWorker: {},
		})._OLSKFundSetupPostPay, []);
	});

	it('calls _OLSKFundSetupGrant', function () {
		deepEqual(_OLSKFundSetup({
			serviceWorker: {},
		})._OLSKFundSetupGrant, []);
	});

	it('calls _OLSKFundSetupGrant after _OLSKFundSetupPostPay', async function () {
		const item = [];

		await _OLSKFundSetup({
			serviceWorker: {},
			_OLSKFundSetupPostPay: (function () {
				return new Promise(function (res) {
					return setTimeout(function () {
						return res(item.push('_OLSKFundSetupPostPay'));
					});
				});
			}),
			_OLSKFundSetupGrant: (function () {
				item.push('_OLSKFundSetupGrant');
			}),
		});

		deepEqual(item, ['_OLSKFundSetupPostPay', '_OLSKFundSetupGrant']);
	});

	it('breaks if no serviceWorker', function () {
		deepEqual(_OLSKFundSetup({
			serviceWorker: null,
		}), {});
	});

});

describe('OLSKFundConfirm', function test_OLSKFundConfirm() {

	it('throws if param1 not window', function () {
		throws(function () {
			mod.OLSKFundConfirm({}, uLocalized, true);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not OLSKLocalized', function () {
		throws(function () {
			mod.OLSKFundConfirm(uWindow(), null, true);
		}, /OLSKErrorInputNotValid/);
	});

	it('calls window.confirm', function () {
		const item = [];

		mod.OLSKFundConfirm(uWindow({
			confirm () {
				item.push(...arguments);
			},
		}), uLocalized);

		deepEqual(item, [uLocalized('OLSKFundConfirmText')]);
	});

	it('returns window.confirm', function () {
		const item = Math.random().toString();

		deepEqual(mod.OLSKFundConfirm(uWindow({
			confirm () {
				return item;
			},
		}), uLocalized), item);
	});

});

describe('OLSKFundURL', function test_OLSKFundURL() {

	const _OLSKFundURL = function (inputData = {}) {
		return mod.OLSKFundURL(Object.assign({
			ParamFormURL: 'https://example.com/form',
			ParamProject: 'alfa',
			ParamIdentity: 'bravo',
			ParamHomeURL: 'https://example.com/charlie',
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundURL(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamFormURL not string', function () {
		throws(function () {
			_OLSKFundURL({
				ParamFormURL: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamProject not string', function () {
		throws(function () {
			_OLSKFundURL({
				ParamProject: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamIdentity not string', function () {
		throws(function () {
			_OLSKFundURL({
				ParamIdentity: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamHomeURL not string', function () {
		throws(function () {
			_OLSKFundURL({
				ParamHomeURL: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns producton recipes', function () {
		deepEqual(_OLSKFundURL(), Object.assign(new URL('https://example.com/form'), {
			hash: (new URLSearchParams({
				seed: JSON.stringify({
					project: 'alfa',
					identity: 'bravo',
					home: 'https://example.com/charlie',
				}),
			})).toString(),
		}).href);
	});

});

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

	const _OLSKFundLauncherItemEnterConfirmation = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKLocalStorage: {
				OLKSLocalStorageSet: inputData.OLKSLocalStorageSet || (function() {}),
			},
		}).OLSKFundLauncherItemEnterConfirmation(Object.assign({
			ParamWindow: uWindow(),
			OLSKLocalized: uLocalized,
			ParamAuthorized: true,
			OLSKFundDispatchPersist: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundLauncherItemEnterConfirmation(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterConfirmation({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterConfirmation({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamAuthorized not boolean', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterConfirmation({
				ParamAuthorized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchPersist not function', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterConfirmation({
				OLSKFundDispatchPersist: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKFundLauncherItemEnterConfirmation();

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKFundLauncherItemEnterConfirmation',
			LCHRecipeName: uLocalized('OLSKFundLauncherItemEnterConfirmationText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
			LCHRecipeIsExcluded: item.LCHRecipeIsExcluded,
		});
	});

	context('LCHRecipeCallback', function () {

		it('returns undefined', function () {
			deepEqual(_OLSKFundLauncherItemEnterConfirmation().LCHRecipeCallback(), undefined);
		});

		it('calls ParamWindow.prompt', function () {
			const item = [];

			_OLSKFundLauncherItemEnterConfirmation({
				ParamWindow: uWindow({
					prompt () {
						item.push(...arguments);
					},
				}),
			}).LCHRecipeCallback();

			deepEqual(item, [uLocalized('OLSKFundLauncherItemEnterConfirmationPromptText')]);
		});

		it('returns if ParamWindow.prompt blank', function () {
			const item = [];

			_OLSKFundLauncherItemEnterConfirmation({
				ParamWindow: uWindow({
					prompt () {
						return ' ';
					},
				}),
				OLKSLocalStorageSet: (function () {
					item.push(...arguments);
				}),
			}).LCHRecipeCallback();

			deepEqual(item, []);
		});

		it('clears _OLSKFundGrantData', function () {
			const item = [];

			_OLSKFundLauncherItemEnterConfirmation({
				ParamWindow: uWindow({
					prompt () {
						return Math.random().toString();
					},
				}),
				OLKSLocalStorageSet: (function () {
					item.push(...arguments);
				}),
			}).LCHRecipeCallback();

			deepEqual(item.slice(1), [mod._OLSKFundGrantData(), null]);
		});

		it('calls OLSKFundDispatchPersist', function () {
			const prompt = Math.random().toString();
			const item = [];

			_OLSKFundLauncherItemEnterConfirmation({
				ParamWindow: uWindow({
					prompt () {
						return prompt;
					},
				}),
				OLSKFundDispatchPersist: (function () {
					item.push(...arguments);
				}),
			}).LCHRecipeCallback();

			deepEqual(item, [prompt]);
		});

	});

	context('LCHRecipeIsExcluded', function () {

		it('returns true if ParamAuthorized true', function () {
			deepEqual(_OLSKFundLauncherItemEnterConfirmation({
				ParamAuthorized: true,
			}).LCHRecipeIsExcluded(), true);
		});

		it('returns false', function () {
			deepEqual(_OLSKFundLauncherItemEnterConfirmation({
				ParamAuthorized: false,
			}).LCHRecipeIsExcluded(), false);
		});

	});

});

describe('OLSKFundLauncherItemClearAuthorization', function test_OLSKFundLauncherItemClearAuthorization() {

	const _OLSKFundLauncherItemClearAuthorization = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKLocalStorage: {
				OLKSLocalStorageSet: inputData.OLKSLocalStorageSet || (function() {}),
			},
		}).OLSKFundLauncherItemClearAuthorization(Object.assign({
			ParamWindow: uWindow(),
			OLSKLocalized: uLocalized,
			ParamAuthorized: true,
			OLSKFundDispatchGrant: (function () {}),
			OLSKFundDispatchPersist: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundLauncherItemClearAuthorization(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKFundLauncherItemClearAuthorization({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKFundLauncherItemClearAuthorization({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamAuthorized not boolean', function () {
		throws(function () {
			_OLSKFundLauncherItemClearAuthorization({
				ParamAuthorized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchGrant not function', function () {
		throws(function () {
			_OLSKFundLauncherItemClearAuthorization({
				OLSKFundDispatchGrant: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchPersist not function', function () {
		throws(function () {
			_OLSKFundLauncherItemClearAuthorization({
				OLSKFundDispatchPersist: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKFundLauncherItemClearAuthorization();

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKFundLauncherItemClearAuthorization',
			LCHRecipeName: uLocalized('OLSKFundLauncherItemClearAuthorizationText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
			LCHRecipeIsExcluded: item.LCHRecipeIsExcluded,
		});
	});

	context('LCHRecipeCallback', function () {

		it('returns undefined', function () {
			deepEqual(_OLSKFundLauncherItemClearAuthorization().LCHRecipeCallback(), undefined);
		});

		it('calls ParamWindow.confirm', function () {
			const item = [];

			_OLSKFundLauncherItemClearAuthorization({
				ParamWindow: uWindow({
					confirm () {
						item.push(...arguments);
					},
				}),
			}).LCHRecipeCallback();

			deepEqual(item, [uLocalized('OLSKFundLauncherItemClearAuthorizationText')]);
		});

		it('returns if ParamWindow.confirm false', function () {
			const item = [];

			_OLSKFundLauncherItemClearAuthorization({
				ParamWindow: uWindow({
					confirm () {
						return false;
					},
				}),
				OLKSLocalStorageSet: (function () {
					item.push(...arguments);
				}),
			}).LCHRecipeCallback();

			deepEqual(item, []);
		});

		it('clears _OLSKFundGrantData', function () {
			const item = [];

			_OLSKFundLauncherItemClearAuthorization({
				ParamWindow: uWindow({
					confirm () {
						return true;
					},
				}),
				OLKSLocalStorageSet: (function () {
					item.push(...arguments);
				}),
			}).LCHRecipeCallback();

			deepEqual(item.slice(1), [mod._OLSKFundGrantData(), null]);
		});

		it('calls OLSKFundDispatchGrant', function () {
			const item = [];

			_OLSKFundLauncherItemClearAuthorization({
				ParamWindow: uWindow({
					confirm () {
						return true;
					},
				}),
				OLSKFundDispatchGrant: (function () {
					item.push(...arguments);
				}),
			}).LCHRecipeCallback();

			deepEqual(item, [null]);
		});

		it('calls OLSKFundDispatchPersist', function () {
			const item = [];

			_OLSKFundLauncherItemClearAuthorization({
				ParamWindow: uWindow({
					confirm () {
						return true;
					},
				}),
				OLSKFundDispatchPersist: (function () {
					item.push(...arguments);
				}),
			}).LCHRecipeCallback();

			deepEqual(item, [null]);
		});

	});

	context('LCHRecipeIsExcluded', function () {

		it('returns true if ParamAuthorized false', function () {
			deepEqual(_OLSKFundLauncherItemClearAuthorization({
				ParamAuthorized: false,
			}).LCHRecipeIsExcluded(), true);
		});

		it('returns false', function () {
			deepEqual(_OLSKFundLauncherItemClearAuthorization({
				ParamAuthorized: true,
			}).LCHRecipeIsExcluded(), false);
		});

	});

});

describe('OLSKFundRecipes', function test_OLSKFundRecipes() {

	const _OLSKFundRecipes = function (inputData = {}) {
		return mod.OLSKFundRecipes(Object.assign({
			ParamWindow: uWindow(),
			OLSKLocalized: uLocalized,
			ParamAuthorized: true,
			OLSK_TESTING_BEHAVIOUR: false,
			OLSKFundDispatchGrant: (function () {}),
			OLSKFundDispatchPersist: (function () {}),
		}, inputData))
	};

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundRecipes(null);
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
