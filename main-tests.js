const { throws, rejects, deepEqual, strictEqual } = require('assert');

const mod = require('./main.js');

const OLSKPact = require('OLSKPact');
const OLSKCrypto = require('OLSKCrypto');
const OLSKObject = require('OLSKObject').default;

const uWindow = function (inputData = {}) {
	return Object.assign({
		prompt () {},
		confirm () {},
		location: {
			reload () {},
			origin: Math.random().toString(),
			pathname: Math.random().toString(),
		},
		localStorage: {
			setItem: (function () {}),
			getItem: (function () {}),
		},
		addEventListener: (function () {}),
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

describe('OLSKFundSetup', function test_OLSKFundSetup() {

	const _OLSKFundSetup = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), inputData).OLSKFundSetup(Object.assign({
			ParamMod: Object.assign({
				_OLSKWebView: {
					modPublic: {
						OLSKModalViewShow: (function () {}),
						OLSKModalViewClose: (function () {}),
					},
				},
				OLSKFundDispatchPersist: (function () {}),
			}, inputData),
			OLSKFundSetupDispatchClue: (function () {}),
			OLSKLocalized: uLocalized,
			ParamFormURL: uLink(),
			ParamProject: Math.random().toString(),
			ParamSpecUI: false,
		}, inputData), {
			ParamWindow: inputData.ParamWindow || uWindow(inputData),
		});
	};

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundSetup(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamMod not object', function () {
		throws(function () {
			_OLSKFundSetup({
				ParamMod: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundSetupDispatchClue not function', function () {
		throws(function () {
			_OLSKFundSetup({
				OLSKFundSetupDispatchClue: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKFundSetup({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamFormURL not string', function () {
		throws(function () {
			_OLSKFundSetup({
				ParamFormURL: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamProject not string', function () {
		throws(function () {
			_OLSKFundSetup({
				ParamProject: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamSpecUI not boolean', function () {
		throws(function () {
			_OLSKFundSetup({
				ParamSpecUI: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns ParamMod', function () {
		const ParamMod = {};

		strictEqual(_OLSKFundSetup({
			ParamMod
		}), ParamMod);
	});

	it('sets _ValueFundClue', function () {
		const item = Math.random().toString();
		deepEqual(_OLSKFundSetup({
			OLSKFundSetupDispatchClue: (function () {
				return item;
			}),
		})._ValueFundClue, item);
	});

	it('sets _OLSKAppToolbarDispatchFundNotConnected', function () {
		deepEqual(typeof _OLSKFundSetup()._OLSKAppToolbarDispatchFundNotConnected, 'function');
	});

	it('sets _OLSKAppToolbarDispatchFundConnected', function () {
		deepEqual(typeof _OLSKFundSetup()._OLSKAppToolbarDispatchFundConnected, 'function');
	});

	it('sets OLSKFundDispatchProgress', function () {
		deepEqual(typeof _OLSKFundSetup().OLSKFundDispatchProgress, 'function');
	});

	it('sets OLSKFundDispatchFail', function () {
		deepEqual(typeof _OLSKFundSetup().OLSKFundDispatchFail, 'function');
	});

	it('sets OLSKFundDispatchReceive', function () {
		deepEqual(typeof _OLSKFundSetup().OLSKFundDispatchReceive, 'function');
	});

	it('sets OLSKAppToolbarDispatchFund', function () {
		deepEqual(typeof _OLSKFundSetup().OLSKAppToolbarDispatchFund, 'function');
	});

	it('sets OLSKFundDispatchGrant', function () {
		deepEqual(typeof _OLSKFundSetup().OLSKFundDispatchGrant, 'function');
	});

	context('_OLSKAppToolbarDispatchFundNotConnected', function () {
		
		it('calls window.confirm', function () {
			deepEqual(uCapture(function (confirm) {
				_OLSKFundSetup({
					confirm,
				})._OLSKAppToolbarDispatchFundNotConnected();
			}), [uLocalized('OLSKRemoteStorageConnectConfirmText')]);
		});
		
		it('sets ParamMod._ValueCloudToolbarHidden', function () {
			const ParamMod = {};
			
			const flag = uRandomElement(true, false);

			_OLSKFundSetup({
				ParamMod,
				confirm: (function () {
					return flag;
				}),
			})._OLSKAppToolbarDispatchFundNotConnected()
			
			deepEqual(ParamMod._ValueCloudToolbarHidden, flag ? false : undefined);
		});
	
	});

	context('_OLSKAppToolbarDispatchFundConnected', function () {
		
		it('sets ParamMod._ValueFundURL', function () {
			const _ValueCloudIdentity = Math.random().toString();
			const ParamFormURL = uLink();
			const ParamProject = Math.random().toString();
			const location = {
				origin: Math.random().toString(),
				pathname: Math.random().toString(),
			};
			
			const ParamMod = _OLSKFundSetup({
				_ValueCloudIdentity,
				location,
				ParamFormURL,
				ParamProject,
			});

			ParamMod._OLSKAppToolbarDispatchFundConnected();
			
			deepEqual(ParamMod._ValueFundURL, mod.OLSKFundURL({
				ParamFormURL,
				ParamProject,
				ParamIdentity: _ValueCloudIdentity,
				ParamHomeURL: location.origin + location.pathname,
			}));
		});

		it('calls ParamMod._OLSKWebView.modPublic.OLSKModalViewShow', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				_OLSKFundSetup({
					_ValueCloudIdentity: Math.random().toString(),
					_OLSKWebView: {
						modPublic: {
							OLSKModalViewShow: (function () {
								capture(item);
							}),
						},
					},
				})._OLSKAppToolbarDispatchFundConnected();
			}), [item]);
		});

		it('calls OLSKFundListen', function () {
			const ParamWindow = uWindow();
			const ParamMod = _OLSKFundSetup({
				_ValueCloudIdentity: Math.random().toString(),
				OLSKFundListen: (function () {
					return [...arguments];
				}),
				ParamWindow,
			});
			deepEqual(ParamMod._OLSKAppToolbarDispatchFundConnected(), [{
				ParamWindow,
				OLSKFundDispatchReceive: ParamMod.OLSKFundDispatchReceive,
			}]);
		});
	
	});

	context('OLSKAppToolbarDispatchFund', function () {

		it('calls dispatch', function () {
			const _ValueCloudIdentity = uRandomElement(Math.random().toString(), undefined);
			const _OLSKAppToolbarDispatchFundNotConnected = Math.random().toString();
			const _OLSKAppToolbarDispatchFundConnected = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				Object.assign(_OLSKFundSetup({
					ParamMod: {
						_ValueCloudIdentity,
					},
				}), {
					_OLSKAppToolbarDispatchFundNotConnected: (function () {
						capture(_OLSKAppToolbarDispatchFundNotConnected);
					}),
					_OLSKAppToolbarDispatchFundConnected: (function () {
						capture(_OLSKAppToolbarDispatchFundConnected);
					}),
				}).OLSKAppToolbarDispatchFund();
			}), _ValueCloudIdentity ? [_OLSKAppToolbarDispatchFundConnected] : [_OLSKAppToolbarDispatchFundNotConnected]);
		});
	
	});

	context('OLSKFundDispatchReceive', function () {

		it('calls ParamMod._OLSKWebView.modPublic.OLSKModalViewClose', function () {
			const item = Math.random().toString();
			deepEqual(uCapture(function (capture) {
				_OLSKFundSetup({
					_OLSKWebView: {
						modPublic: {
							OLSKModalViewClose: (function () {
								capture(item);
							}),
						},
					},
				}).OLSKFundDispatchReceive();
			}), [item]);
		});
		
		it('sets ParamMod._ValueFundClue', function () {
			const item = Math.random().toString();
			
			const ParamMod = _OLSKFundSetup();

			ParamMod.OLSKFundDispatchReceive(item);
			
			deepEqual(ParamMod._ValueFundClue, item);
		});

		it('calls ParamMod.OLSKFundDispatchPersist', function () {
			const item = Math.random().toString();
			deepEqual(_OLSKFundSetup({
				OLSKFundDispatchPersist: (function () {
					return [...arguments];
				}),
			}).OLSKFundDispatchReceive(item), [item]);
		});
	
	});

	context('OLSKFundDispatchProgress', function () {

		it('sets ParamMod._ValueOLSKFundProgress', function () {
			const item = Math.random().toString();
			
			const ParamMod = _OLSKFundSetup();

			ParamMod.OLSKFundDispatchProgress(item);
			
			deepEqual(ParamMod._ValueOLSKFundProgress, item);
		});

	});

	context('OLSKFundDispatchFail', function () {

		it('calls ParamMod.OLSKFundDispatchPersist', function () {
			deepEqual(_OLSKFundSetup({
				OLSKFundDispatchPersist: (function () {
					return [...arguments];
				}),
			}).OLSKFundDispatchFail(), [null]);
		});
	
	});

	context('OLSKFundDispatchGrant', function () {

		it('sets ParamMod._ValueOLSKFundGrant', function () {
			const item = {
				[Math.random().toString()]: Math.random().toString(),
				XYZDate: (new Date()).toJSON(),
			};
			
			const ParamMod = _OLSKFundSetup();

			ParamMod.OLSKFundDispatchGrant(item);
			
			deepEqual(ParamMod._ValueOLSKFundGrant, OLSKObject.OLSKObjectPostJSONParse(item));
		});

	});

});

describe('OLSKFundResponseIsPresent', function test_OLSKFundResponseIsPresent() {

	const _OLSKFundResponseIsPresent = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKLocalStorage: {
				OLKSLocalStorageGet: inputData || (function () {}),
			},
		}).OLSKFundResponseIsPresent();
	};

	it('calls OLKSLocalStorageGet', function () {
		const item = [];

		_OLSKFundResponseIsPresent(function () {
			item.push(...arguments);
		});

		deepEqual(item, [undefined, mod._OLSKFundGrantData()]);
	});

	it('returns true if truthy', function () {
		deepEqual(_OLSKFundResponseIsPresent(function () {
			return Math.random().toString();
		}), true);
	});

	it('returns false if falsy', function () {
		deepEqual(_OLSKFundResponseIsPresent(), false);
	});

});

describe('OLSKFundSetupPostPay', function test_OLSKFundSetupPostPay() {

	const _OLSKFundSetupPostPay = function (inputData = {}) {
		const item = {};

		mod.OLSKFundSetupPostPay({
			ParamWindow: inputData.ParamWindow || uWindow(Object.assign({
				location: Object.assign(new URL(uLink()), {
					hash: (new URLSearchParams(inputData.clue ? {
						clue: inputData.clue,
					} : {})).toString(),
				}),
			})),
			_ValueFundClue: inputData._ValueFundClue || null,
			OLSKFundDispatchPersist: (function () {
				item.OLSKFundDispatchPersist = inputData.OLSKFundDispatchPersist ? inputData.OLSKFundDispatchPersist() :  item.OLSKFundDispatchPersist = [...arguments];
			}),
		});

		return item;
	};

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundSetupPostPay(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if _ValueFundClue not defined', function () {
		throws(function () {
			mod.OLSKFundSetupPostPay({
				_ValueFundClue: undefined,
				OLSKFundDispatchPersist: (function () {}),
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchPersist not function', function () {
		throws(function () {
			mod.OLSKFundSetupPostPay({
				_ValueFundClue: Math.random().toString(),
				OLSKFundDispatchPersist: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('breaks if no clue', function () {
		deepEqual(_OLSKFundSetupPostPay(), {});
	});

	it('breaks if clue matches _ValueFundClue', function () {
		const _ValueFundClue = Math.random().toString();

		deepEqual(_OLSKFundSetupPostPay({
			clue: _ValueFundClue,
			_ValueFundClue,
		}), {});
	});

	it('breaks if _ValueFundClue different', function () {
		const _ValueFundClue = Math.random().toString();

		deepEqual(_OLSKFundSetupPostPay({
			clue: Math.random().toString(),
			_ValueFundClue,
		}), {});
	});

	it('clears hash', function () {
		const location = Object.assign(new URL('https://example.com/form'), {
			hash: (new URLSearchParams({
				clue: Math.random().toString(),
			})).toString(),
		});

		_OLSKFundSetupPostPay({
			ParamWindow: uWindow(Object.assign({
				location,
			})),
		});

		deepEqual(location.hash, '');
	});

	it('passes clue to OLSKFundDispatchPersist', function () {
		const clue = Math.random().toString();

		deepEqual(_OLSKFundSetupPostPay({
			clue
		}), {
			OLSKFundDispatchPersist: [clue],
		});
	});

	it('returns OLSKFundDispatchPersist', function () {
		const item = Math.random().toString();

		deepEqual(_OLSKFundSetupPostPay({
			clue: Math.random().toString(),
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
		deepEqual(mod._OLSKFundGrantData(), 'OLSK_FUND_GRANT_DATA');
	});

});

describe('OLSKFundSetupGrant', function test_OLSKFundSetupGrant() {

	const _OLSKFundSetupGrant = async function (inputData = {}) {
		const item = {};

		await Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKLocalStorage: {
				OLKSLocalStorageGet: inputData.OLKSLocalStorageGet || (function () {
					item.OLKSLocalStorageGet = [...arguments];
				}),
				OLKSLocalStorageSet: inputData.OLKSLocalStorageSet || (function () {
					item.OLKSLocalStorageSet = [...arguments];
					
					return [...arguments].pop();
				}),
			},
		}).OLSKFundSetupGrant(Object.assign({
			ParamWindow: uWindow({
				fetch: inputData.fetch || (function () {
					item.fetch = [...arguments];
					return {
						response: 200,
						json: (function () {
							return {};
						}),
					};
				}),
				alert: inputData.alert || (function () {
					item.alert = [...arguments];
				}),
			}),
			OLSK_FUND_API_URL: inputData.OLSK_FUND_API_URL || Math.random().toString(),
			OLSKLocalized: uLocalized,
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: process.env.OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE,
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: process.env.OLSK_CRYPTO_PAIR_SENDER_PUBLIC,
			OLSKFundDispatchProgress: (function () {
				item.OLSKFundDispatchProgress = [...arguments];
			}),
			OLSKFundDispatchFail: (function () {
				item.OLSKFundDispatchFail = [...arguments];
			}),
			OLSKFundDispatchGrant: (function () {
				item.OLSKFundDispatchGrant = [...arguments];
			}),
		}, inputData, {
			ParamBody: Object.assign({
				OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeEmail(),
				OLSKPactAuthIdentity: 'alfa@bravo.charlie',
				OLSKPactAuthProof: Math.random().toString(),
				OLSKPactPayIdentity: 'alfa@bravo.charlie',
				OLSKPactPayClue: Math.random().toString(),
			}, inputData.ParamBody || {}),
		}));
		
		return item;
	};

	it('rejects if not object', async function () {
		await rejects(mod.OLSKFundSetupGrant(null), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE not string', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE not filled', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: ' ',
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_CRYPTO_PAIR_SENDER_PUBLIC not string', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_CRYPTO_PAIR_SENDER_PUBLIC not filled', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: ' ',
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSK_FUND_API_URL not string', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSK_FUND_API_URL: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if ParamBody not OLSKPactAuthModel', async function () {
		await rejects(_OLSKFundSetupGrant({
			ParamBody: {
				OLSKPactAuthProof: null,
			},
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if ParamBody not OLSKPactPayModel', async function () {
		await rejects(_OLSKFundSetupGrant({
			ParamBody: {
				OLSKPactPayClue: null,
			},
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSKFundDispatchProgress not function', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSKFundDispatchProgress: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSKFundDispatchFail not function', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSKFundDispatchFail: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSKFundDispatchGrant not function', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSKFundDispatchGrant: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('rejects if OLSKLocalized not function', async function () {
		await rejects(_OLSKFundSetupGrant({
			OLSKLocalized: null,
		}), /OLSKErrorInputNotValid/);
	});

	it('calls _DataFoilOLSKLocalStorage.OLKSLocalStorageGet', async function () {
		deepEqual((await _OLSKFundSetupGrant()).OLKSLocalStorageGet.slice(1), [mod._OLSKFundGrantData()]);
	});

	context('cached', function test_cached () {
		
		it('calls OLSKFundDispatchGrant', async function () {
			const item = {
				alfa: Math.random().toString(),
			};

			const OLSK_FUND_GRANT_V1 = await OLSKCrypto.OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, JSON.stringify(item));

			deepEqual((await _OLSKFundSetupGrant({
				OLKSLocalStorageGet: (function () {
					return {
						OLSK_FUND_GRANT_V1,
					};
				}),
			})), {
				OLSKFundDispatchGrant: [item],
			});
		});
	
	});

	context('request', function test_request () {
		
		it('calls ParamWindow.fetch', async function () {
			const OLSK_FUND_API_URL = Math.random().toString();
			const ParamBody = {
				OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeEmail(),
				OLSKPactAuthIdentity: 'alfa@bravo.charlie',
				OLSKPactAuthProof: Math.random().toString(),
				OLSKPactPayIdentity: 'alfa@bravo.charlie',
				OLSKPactPayClue: Math.random().toString(),
			};

			deepEqual((await _OLSKFundSetupGrant({
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

		it('calls OLSKFundDispatchProgress', async function () {
			deepEqual((await _OLSKFundSetupGrant({
				fetch: (function () {
					throw new Error(Math.random().toString());
				}),
			})).OLSKFundDispatchProgress, [true]);
		});

		it('alerts if ParamWindow.fetch throws', async function () {
			deepEqual((await _OLSKFundSetupGrant({
				fetch: (function () {
					throw new Error(Math.random().toString());
				}),
			})).alert, [uLocalized('OLSKFundGrantErrorConnectionText')]);
		});
	
	});

	context('response', function test_response () {
		
		context('not 200', function () {

			const RCSAPIError = Math.random().toString();
			const result = _OLSKFundSetupGrant({
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
			});
			
			it('alerts with error', async function () {
				deepEqual((await result).alert, [RCSAPIError]);
			});
			
			it('calls OLSKFundDispatchProgress', async function () {
				deepEqual((await _OLSKFundSetupGrant()).OLSKFundDispatchProgress, [false]);
			});

			it('calls OLSKFundDispatchFail', async function () {
				deepEqual((await result).OLSKFundDispatchFail, [undefined]);
			});
		
		});

		context('200', function () {
			
			it('calls _DataFoilOLSKLocalStorage.OLKSLocalStorageSet', async function () {
				const payload = {
					OLSK_FUND_GRANT_V1: await OLSKCrypto.OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, Math.random().toString()),
				};
				
				deepEqual((await _OLSKFundSetupGrant({
					fetch: (function () {
						return {
							status: 200,
							json: (function () {
								return payload;
							}),
						};
					}),
				})).OLKSLocalStorageSet.slice(1), [mod._OLSKFundGrantData(), payload]);
			});

			it('calls OLSKFundDispatchProgress', async function () {
				deepEqual((await _OLSKFundSetupGrant()).OLSKFundDispatchProgress, [false]);
			});

			it('calls OLSKFundDispatchGrant', async function () {
				const item = {
					alfa: Math.random().toString(),
				};
				deepEqual((await _OLSKFundSetupGrant({
					OLKSLocalStorageGet: (function () {}),
					OLKSLocalStorageSet: (function () {
						return [...arguments].pop();
					}),
					fetch: (function () {
						return {
							status: 200,
							json: (async function () {
								return {
									OLSK_FUND_GRANT_V1: await OLSKCrypto.OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, JSON.stringify(item)),
								};
							}),
						};
					}),
				})).OLSKFundDispatchGrant, [item]);
			});
		
		});
	
	});

	context('decryption', function test_decryption () {
		
		it('alerts if not decrypted', async function () {
			const OLSK_FUND_GRANT_V1 = await OLSKCrypto.OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, Math.random().toString());

			deepEqual((await _OLSKFundSetupGrant({
				OLKSLocalStorageGet: (function () {
					return {
						OLSK_FUND_GRANT_V1,
					};
				}),
				OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: Math.random().toString(),
			})).alert, [uLocalized('OLSKFundGrantErrorDecryptionText')]);
		});

		it('alerts if not signed', async function () {
			const OLSK_FUND_GRANT_V1 = await OLSKCrypto.OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, Math.random().toString());

			deepEqual((await _OLSKFundSetupGrant({
				OLKSLocalStorageGet: (function () {
					return {
						OLSK_FUND_GRANT_V1,
					};
				}),
				OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE,
			})).alert, [uLocalized('OLSKFundGrantErrorSigningText')]);
		});
	
	});

});

describe('OLSKFundGate', function test_OLSKFundGate() {

	it('throws if param1 not window', function () {
		throws(function () {
			mod.OLSKFundGate({}, uLocalized, true);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not OLSKLocalized', function () {
		throws(function () {
			mod.OLSKFundGate(uWindow(), null, true);
		}, /OLSKErrorInputNotValid/);
	});

	it('calls window.confirm', function () {
		const item = [];

		mod.OLSKFundGate(uWindow({
			confirm () {
				item.push(...arguments);
			},
		}), uLocalized);

		deepEqual(item, [uLocalized('OLSKFundGateText')]);
	});

	it('returns window.confirm', function () {
		const item = Math.random().toString();

		deepEqual(mod.OLSKFundGate(uWindow({
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

	it('returns string', function () {
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


describe('OLSKFundListen', function test_OLSKFundListen() {

	const _OLSKFundListen = function (inputData = {}) {
		const item = {};

		mod.OLSKFundListen({
			ParamWindow: inputData.ParamWindow || uWindow({
				addEventListener: (function (a, b, c) {
					b(inputData);
				}),
			}),
			OLSKFundDispatchReceive: (function () {
				item.OLSKFundDispatchReceive = inputData.OLSKFundDispatchReceive ? inputData.OLSKFundDispatchReceive() :  item.OLSKFundDispatchReceive = [...arguments];
			}),
		});

		return item;
	};

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundListen(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not valid', function () {
		throws(function () {
			_OLSKFundListen({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchReceive not function', function () {
		throws(function () {
			mod.OLSKFundListen({
				ParamWindow: uWindow(),
				OLSKFundDispatchReceive: Math.random().toString(),
			});
		}, /OLSKErrorInputNotValid/);
	});

	context('OLSKFundDispatchReceive', function () {
		
		it('skips if not object', function () {
			deepEqual(_OLSKFundListen({
				data: Math.random().toString(),
			}), {});
		});
		
		it('skips if no OLSK_FUND_CLUE', function () {
			deepEqual(_OLSKFundListen({
				data: {
					alfa: Math.random().toString(),
				},
			}), {});
		});
		
		it('calls with OLSK_FUND_CLUE', function () {
			const data = {
				OLSK_FUND_CLUE: Math.random().toString(),
			};
			deepEqual(_OLSKFundListen({
				data,
			}), {
				OLSKFundDispatchReceive: [data.OLSK_FUND_CLUE],
			});
		});
	
	});

});

describe('_OLSKFundPricingStringRowErrors', function test__OLSKFundPricingStringRowErrors() {

	const item = `${ (new Date()).toJSON() }:${ uRandomInt() } ${ uRandomInt() },${ uRandomInt() } ${ uRandomInt() },${ uRandomInt() } ${ uRandomInt() }`;

	it('throws if not string', function() {
		throws(function() {
			mod._OLSKFundPricingStringRowErrors(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns true if terminator', function() {
		deepEqual(mod._OLSKFundPricingStringRowErrors(item + ';'), true);
	});

	it('returns true if no seperator', function() {
		deepEqual(mod._OLSKFundPricingStringRowErrors(`${ Date.now() }${ item.split(':').pop() }`), true);
	});

	it('returns true if key not date', function() {
		deepEqual(mod._OLSKFundPricingStringRowErrors(`alfa:${ item.split(':').pop() }`), true);
	});

	it('returns true if value empty', function() {
		deepEqual(mod._OLSKFundPricingStringRowErrors(`${ Date.now() }:`), true);
	});

	it('returns true if value count under four', function() {
		deepEqual(mod._OLSKFundPricingStringRowErrors(`${ Date.now() }:1 2 3`), true);
	});

	it('returns true if value count over four', function() {
		deepEqual(mod._OLSKFundPricingStringRowErrors(`${ Date.now() }:1 2 3 4 5`), true);
	});

	it('returns false', function() {
		deepEqual(mod._OLSKFundPricingStringRowErrors(item), false);
	});

});

describe('OLSKFundPricingStringIsValid', function test_OLSKFundPricingStringIsValid() {

	it('throws if not string', function() {
		throws(function() {
			mod.OLSKFundPricingStringIsValid(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns false if no rows', function() {
		deepEqual(mod.OLSKFundPricingStringIsValid(Date.now().toString()), false);
	});

	it('returns false if row not valid', function() {
		deepEqual(mod.OLSKFundPricingStringIsValid('alfa:1'), false);
	});

	it('returns true', function() {
		deepEqual(mod.OLSKFundPricingStringIsValid(`${ (new Date()).toJSON() }:10 10,100 50,500 250`), true);
	});

});

describe('OLSKFundTier', function test_OLSKFundTier() {

	const _OLSKFundTier = function (inputData = {}) {
		return mod.OLSKFundTier(inputData._OLSKFundPricingRows ? inputData._OLSKFundPricingRows.join(';') : (inputData._OLSKFundPricingNumbers ? `0:${ inputData._OLSKFundPricingNumbers.map(function (e, i) {
			return i ? [e, e * 10].join(',') : e;
		}).join(' ') }` : '0:1 2 3 4'), OLSKPact.OLSKPactDataGrantObjectValid(Object.assign({
			OLSKPactGrantContribution: 400,
			OLSKPactGrantFrequencyOption: OLSKPact.OLSKPactGrantFrequencyOptionMonthly(),
		}, inputData)));
	};

	it('throws if param1 not valid', function () {
		throws(function () {
			mod.OLSKFundTier('alfa:1')
		}, /OLSKErrorInputNotValid/);
	});

	it('returns integer', function () {
		deepEqual(mod.OLSKFundTier('0:1 2 3 4'), 0);
	});

	it('throws if param2 not valid', function () {
		throws(function () {
			_OLSKFundTier({
				OLSKPactGrantProject: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	context('date', function () {
		
		it('uses first if under first', function () {
			const item = Date.now();

			deepEqual(_OLSKFundTier({
				OLSKPactGrantStartDate: new Date(item),
				_OLSKFundPricingRows: [
					`${ item + 1 }:1 2,10 3,30 5`,
					`${ item + 2 }:1 2,10 3,30 4`,
				],
			}), 4);
		});
		
		it('uses first if first', function () {
			const item = Date.now();

			deepEqual(_OLSKFundTier({
				OLSKPactGrantStartDate: new Date(item),
				_OLSKFundPricingRows: [
					`${ item }:1 2,10 3,30 5`,
					`${ item }:1 2,10 3,30 4`,
				],
			}), 4);
		});
		
		it('uses first if under second', function () {
			const item = Date.now();

			deepEqual(_OLSKFundTier({
				OLSKPactGrantStartDate: new Date(item),
				_OLSKFundPricingRows: [
					`${ item }:1 2,10 3,30 5`,
					`${ item + 1 }:1 2,10 3,30 4`,
				],
			}), 4);
		});
		
		it('uses second if second', function () {
			const item = Date.now();

			deepEqual(_OLSKFundTier({
				OLSKPactGrantStartDate: new Date(item),
				_OLSKFundPricingRows: [
					`${ item - 1 }:1 2,10 3,30 4`,
					`${ item }:1 2,10 3,30 5`,
				],
			}), 4);
		});
		
		it('uses second if over second', function () {
			const item = Date.now();

			deepEqual(_OLSKFundTier({
				OLSKPactGrantStartDate: new Date(item),
				_OLSKFundPricingRows: [
					`${ item - 1 }:1 2,10 3,30 4`,
					`${ item - 2 }:1 2,10 3,30 5`,
				],
			}), 4);
		});
	
	});

	context('annual_sum', function () {

		context('once / yearly', function () {

			const OLSKPactGrantFrequencyOption = Math.random() > 0.5 ? OLSKPact.OLSKPactGrantFrequencyOptionOnce() : OLSKPact.OLSKPactGrantFrequencyOptionYearly();
			
			it('returns 1 if under Tier2', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: item * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item + 1,
						item + 2,
						item + 3,
						item + 4,
					],
				}), 1);	
			});
			
			it('returns 2 if under Tier3', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: item * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item,
						item + 2,
						item + 3,
						item + 4,
					]
				}), 2);	
			});
			
			it('returns 3 if under Tier4', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: item * 10 * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item - 1,
						item,
						item + 3,
						item + 4,
					]
				}), 3);	
			});
			
			it('returns 4 if under Tier5', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: item * 10 * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item - 1,
						item - 2,
						item,
						item + 4,
					]
				}), 4);	
			});
			
			it('returns 5 if above Tier4', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: item * 10 * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item - 1,
						item - 2,
						item - 3,
						item,
					]
				}), 5);	
			});
		
		});

		context('monthly', function () {

			const OLSKPactGrantFrequencyOption = OLSKPact.OLSKPactGrantFrequencyOptionMonthly();
			
			it('returns 1 if under Tier2', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: (item + 1) / 13 * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item + 1,
						item + 2,
						item + 3,
						item + 4,
					],
				}), 1);	
			});
			
			it('returns 2 if under Tier3', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: (item + 1) / 12 * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item + 1,
						item + 2,
						item + 3,
						item + 4,
					]
				}), 2);	
			});
			
			it('returns 3 if under Tier4', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: (item + 2) * 10 / 12 * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item + 1,
						item + 2,
						item + 3,
						item + 4,
					]
				}), 3);	
			});
			
			it('returns 4 if under Tier5', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: (item + 3) * 10 / 12 * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item + 1,
						item + 2,
						item + 3,
						item + 4,
					]
				}), 4);	
			});
			
			it('returns 5 if above Tier4', function () {
				const item = uRandomInt();

				deepEqual(_OLSKFundTier({
					OLSKPactGrantContribution: (item + 4) * 10 / 12 * 100,
					OLSKPactGrantFrequencyOption,
					_OLSKFundPricingNumbers: [
						item + 1,
						item + 2,
						item + 3,
						item + 4,
					]
				}), 5);	
			});
		
		});
	
	});

});

describe('OLSKFundIsEligible', function test_OLSKFundIsEligible() {

	const _OLSKFundIsEligible = function (inputData = {}) {
		const project = Math.random().toString();
		const tier = uRandomInt();

		return mod.OLSKFundIsEligible(Object.assign({
			ParamMinimumTier: inputData._MatchTier || tier,
			ParamCurrentProject: project,
			ParamBundleProjects: [project],
			ParamGrantTier: inputData._MatchTier || tier - 1,
			ParamGrantProject: project,
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundIsEligible(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamMinimumTier not number', function () {
		throws(function () {
			_OLSKFundIsEligible({
				ParamMinimumTier: '1',
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamCurrentProject not string', function () {
		throws(function () {
			_OLSKFundIsEligible({
				ParamCurrentProject: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamBundleProjects not array', function () {
		throws(function () {
			_OLSKFundIsEligible({
				ParamBundleProjects: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamGrantTier not number', function () {
		throws(function () {
			_OLSKFundIsEligible({
				ParamGrantTier: '1',
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamGrantProject not string', function () {
		throws(function () {
			_OLSKFundIsEligible({
				ParamGrantProject: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns boolean', function () {
		deepEqual(_OLSKFundIsEligible(), false);
	});

	it('returns false if under ParamMinimumTier', function () {
		const item = Date.now() % 100;

		deepEqual(_OLSKFundIsEligible({
			ParamMinimumTier: item,
			ParamGrantTier: item - 1,
		}), false);
	});

	it('returns true if over ParamMinimumTier', function () {
		const item = Date.now() % 100;

		deepEqual(_OLSKFundIsEligible({
			ParamMinimumTier: item - 1,
			ParamGrantTier: item,
		}), true);
	});

	context('_MatchTier', function () {
		
		it('returns true if ParamCurrentProject matches ParamGrantProject', function () {
			const item = Math.random().toString();

			deepEqual(_OLSKFundIsEligible({
				_MatchTier: Math.random(),
				ParamCurrentProject: item,
				ParamGrantProject: item,
			}), true);
		});
	
	});

	context('Tier2', function () {

		it('returns true if ParamGrantProject in ParamBundleProjects', function () {
			const item = Math.random().toString();

			deepEqual(_OLSKFundIsEligible({
				_MatchTier: 2,
				ParamGrantProject: item,
				ParamBundleProjects: [item],
			}), true);
		});

		it('returns false', function () {
			deepEqual(_OLSKFundIsEligible({
				_MatchTier: 2,
				ParamGrantProject: Math.random().toString(),
				ParamBundleProjects: [Math.random().toString()],
			}), false);
		});
	
	});

	context('above Tier2', function () {

		it('returns true', function () {
			deepEqual(_OLSKFundIsEligible({
				_MatchTier: 2 + Math.random(),
				ParamCurrentProject: Math.random().toString(),
				ParamBundleProjects: [Math.random().toString()],
			}), true);
		});
	
	});

});

describe('OLSKFundRemainder', function test_OLSKFundRemainder() {

	it('throws if param1 not number', function () {
		throws(function () {
			mod.OLSKFundRemainder(Date.now().toString(), Date.now());
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not number', function () {
		throws(function () {
			mod.OLSKFundRemainder(Date.now(), Date.now().toString());
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 0', function () {
		throws(function () {
			mod.OLSKFundRemainder(Date.now(), 0);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 negative', function () {
		throws(function () {
			mod.OLSKFundRemainder(Date.now(), -1);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns integer', function () {
		const param1 = uRandomInt();
		const param2 = param1 + uRandomInt();
		deepEqual(mod.OLSKFundRemainder(param1, param2), param2 - param1);
	});

	it('caps at zero', function () {
		const item = uRandomInt();
		deepEqual(mod.OLSKFundRemainder(item + 1, item), 0);
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

describe('OLSKFundLauncherItemFakeFlipProgress', function test_OLSKFundLauncherItemFakeFlipProgress() {

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundLauncherItemFakeFlipProgress(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.OLSKFundLauncherItemFakeFlipProgress({});
		deepEqual(item, {
			LCHRecipeName: 'OLSKFundLauncherItemFakeFlipProgress',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {
		
		it('calls OLSKFundDispatchProgress with flipped _ValueOLSKFundProgress', function () {
			const _ValueOLSKFundProgress = uRandomElement(true, false);
			deepEqual(mod.OLSKFundLauncherItemFakeFlipProgress({
				_ValueOLSKFundProgress,
				OLSKFundDispatchProgress: (function () {
					return [...arguments];
				}),
			}).LCHRecipeCallback(), [!_ValueOLSKFundProgress]);
		});

	});

});

describe('OLSKFundLauncherItemFakeTier2WithNoBundle', function test_OLSKFundLauncherItemFakeTier2WithNoBundle() {

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundLauncherItemFakeTier2WithNoBundle(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.OLSKFundLauncherItemFakeTier2WithNoBundle({});
		deepEqual(item, {
			LCHRecipeName: 'OLSKFundLauncherItemFakeTier2WithNoBundle',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {
		
		it('calls set _ValueOLSKFundGrant', function () {
			const item = {
				_ValueOLSKFundGrant: OLSKPact.OLSKPactDataGrantObjectValid()
			};
			
			mod.OLSKFundLauncherItemFakeTier2WithNoBundle(item).LCHRecipeCallback()
			
			deepEqual(item._ValueOLSKFundGrant, Object.assign(Object.assign({}, item._ValueOLSKFundGrant), {
				OLSKPactGrantContribution: 1000,
				OLSKPactGrantFrequencyOption: OLSKPact.OLSKPactGrantFrequencyOptionYearly(),
			}));
		});

	});

});

describe('OLSKFundLauncherItemFakeTier2WithBundle', function test_OLSKFundLauncherItemFakeTier2WithBundle() {

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundLauncherItemFakeTier2WithBundle(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.OLSKFundLauncherItemFakeTier2WithBundle({});
		deepEqual(item, {
			LCHRecipeName: 'OLSKFundLauncherItemFakeTier2WithBundle',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {
		
		it('calls set _ValueOLSKFundGrant', function () {
			const item = {
				_ValueOLSKFundGrant: OLSKPact.OLSKPactDataGrantObjectValid()
			};
			
			mod.OLSKFundLauncherItemFakeTier2WithBundle(item).LCHRecipeCallback()
			
			deepEqual(item._ValueOLSKFundGrant, Object.assign(Object.assign({}, item._ValueOLSKFundGrant), {
				OLSKPactGrantContribution: 1000,
				OLSKPactGrantFrequencyOption: OLSKPact.OLSKPactGrantFrequencyOptionYearly(),
				OLSKPactGrantProject: 'FakeBundleProject',
			}));
		});

	});

});

describe('OLSKFundLauncherItemFakeTier2Proxy', function test_OLSKFundLauncherItemFakeTier2Proxy() {

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundLauncherItemFakeTier2Proxy(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = mod.OLSKFundLauncherItemFakeTier2Proxy({});
		deepEqual(item, {
			LCHRecipeName: 'OLSKFundLauncherItemFakeTier2Proxy',
			LCHRecipeCallback: item.LCHRecipeCallback,
			LCHRecipeIsExcluded: item.LCHRecipeIsExcluded,
		});
	});

	context('LCHRecipeIsExcluded', function () {

		it('calls DataIsEligible', function () {
			const item = [];

			mod.OLSKFundLauncherItemFakeTier2Proxy({
				DataIsEligible: (function () {
					item.push(...arguments);
				}),
			}).LCHRecipeIsExcluded();
			
			deepEqual(item, [{
				ParamMinimumTier: 2,
			}]);
		});

		it('returns flipped result', function () {
			const DataIsEligible = uRandomElement(true, false);

			deepEqual(mod.OLSKFundLauncherItemFakeTier2Proxy({
				DataIsEligible: (function () {
					return DataIsEligible;
				}),
			}).LCHRecipeIsExcluded(), !DataIsEligible);
		});

	});

});

describe('OLSKFundLauncherItemEnterClue', function test_OLSKFundLauncherItemEnterClue() {

	const _OLSKFundLauncherItemEnterClue = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKLocalStorage: {
				OLKSLocalStorageSet: inputData.OLKSLocalStorageSet || (function() {}),
			},
		}).OLSKFundLauncherItemEnterClue(Object.assign({
			ParamWindow: uWindow(),
			OLSKLocalized: uLocalized,
			ParamConnected: true,
			ParamAuthorized: true,
			OLSKFundDispatchPersist: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundLauncherItemEnterClue(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterClue({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterClue({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamConnected not boolean', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterClue({
				ParamConnected: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamAuthorized not boolean', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterClue({
				ParamAuthorized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchPersist not function', function () {
		throws(function () {
			_OLSKFundLauncherItemEnterClue({
				OLSKFundDispatchPersist: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKFundLauncherItemEnterClue();

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKFundLauncherItemEnterClue',
			LCHRecipeName: uLocalized('OLSKFundLauncherItemEnterClueText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
			LCHRecipeIsExcluded: item.LCHRecipeIsExcluded,
		});
	});

	context('LCHRecipeCallback', function () {

		it('returns undefined', function () {
			deepEqual(_OLSKFundLauncherItemEnterClue().LCHRecipeCallback(), undefined);
		});

		it('calls ParamWindow.prompt', function () {
			const item = [];

			_OLSKFundLauncherItemEnterClue({
				ParamWindow: uWindow({
					prompt () {
						item.push(...arguments);
					},
				}),
			}).LCHRecipeCallback();

			deepEqual(item, [uLocalized('OLSKFundLauncherItemEnterCluePromptText')]);
		});

		it('returns if ParamWindow.prompt blank', function () {
			const item = [];

			_OLSKFundLauncherItemEnterClue({
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

			_OLSKFundLauncherItemEnterClue({
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

			_OLSKFundLauncherItemEnterClue({
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

		it('returns true if ParamConnected false', function () {
			deepEqual(_OLSKFundLauncherItemEnterClue({
				ParamConnected: false,
				ParamAuthorized: false,
			}).LCHRecipeIsExcluded(), true);
		});

		it('returns true if ParamAuthorized true', function () {
			deepEqual(_OLSKFundLauncherItemEnterClue({
				ParamConnected: true,
				ParamAuthorized: true,
			}).LCHRecipeIsExcluded(), true);
		});

		it('returns false', function () {
			deepEqual(_OLSKFundLauncherItemEnterClue({
				ParamConnected: true,
				ParamAuthorized: false,
			}).LCHRecipeIsExcluded(), false);
		});

	});

});

describe('OLSKFundLauncherItemClearClue', function test_OLSKFundLauncherItemClearClue() {

	const _OLSKFundLauncherItemClearClue = function (inputData = {}) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilOLSKLocalStorage: {
				OLKSLocalStorageSet: inputData.OLKSLocalStorageSet || (function() {}),
			},
		}).OLSKFundLauncherItemClearClue(Object.assign({
			ParamWindow: uWindow(),
			OLSKLocalized: uLocalized,
			ParamConnected: true,
			ParamAuthorized: true,
			OLSKFundDispatchGrant: (function () {}),
			OLSKFundDispatchPersist: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundLauncherItemClearClue(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKFundLauncherItemClearClue({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKFundLauncherItemClearClue({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamConnected not boolean', function () {
		throws(function () {
			_OLSKFundLauncherItemClearClue({
				ParamConnected: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamAuthorized not boolean', function () {
		throws(function () {
			_OLSKFundLauncherItemClearClue({
				ParamAuthorized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchGrant not function', function () {
		throws(function () {
			_OLSKFundLauncherItemClearClue({
				OLSKFundDispatchGrant: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKFundDispatchPersist not function', function () {
		throws(function () {
			_OLSKFundLauncherItemClearClue({
				OLSKFundDispatchPersist: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKFundLauncherItemClearClue();

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKFundLauncherItemClearClue',
			LCHRecipeName: uLocalized('OLSKFundLauncherItemClearClueText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
			LCHRecipeIsExcluded: item.LCHRecipeIsExcluded,
		});
	});

	context('LCHRecipeCallback', function () {

		it('returns undefined', function () {
			deepEqual(_OLSKFundLauncherItemClearClue().LCHRecipeCallback(), undefined);
		});

		it('calls ParamWindow.confirm', function () {
			const item = [];

			_OLSKFundLauncherItemClearClue({
				ParamWindow: uWindow({
					confirm () {
						item.push(...arguments);
					},
				}),
			}).LCHRecipeCallback();

			deepEqual(item, [uLocalized('OLSKFundLauncherItemClearClueConfirmText')]);
		});

		it('returns if ParamWindow.confirm false', function () {
			const item = [];

			_OLSKFundLauncherItemClearClue({
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

			_OLSKFundLauncherItemClearClue({
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

			_OLSKFundLauncherItemClearClue({
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

			_OLSKFundLauncherItemClearClue({
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

		it('returns true if ParamConnected false', function () {
			deepEqual(_OLSKFundLauncherItemClearClue({
				ParamConnected: false,
				ParamAuthorized: true,
			}).LCHRecipeIsExcluded(), true);
		});

		it('returns true if ParamAuthorized false', function () {
			deepEqual(_OLSKFundLauncherItemClearClue({
				ParamConnected: true,
				ParamAuthorized: false,
			}).LCHRecipeIsExcluded(), true);
		});

		it('returns false', function () {
			deepEqual(_OLSKFundLauncherItemClearClue({
				ParamConnected: true,
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
			ParamConnected: uRandomElement(true, false),
			ParamAuthorized: uRandomElement(true, false),
			ParamMod: {},
			ParamSpecUI: false,
			OLSKFundDispatchGrant: (function () {}),
			OLSKFundDispatchPersist: (function () {}),
		}, inputData))
	};

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKFundRecipes(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamMod not object', function () {
		throws(function () {
			_OLSKFundRecipes({
				ParamMod: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamSpecUI not boolean', function () {
		throws(function () {
			_OLSKFundRecipes({
				ParamSpecUI: null,
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

	context('ParamSpecUI', function () {

		it('returns all recipes if true', function () {
			deepEqual(_OLSKFundRecipes({
				ParamSpecUI: true,
			}).map(function (e) {
				return e.LCHRecipeSignature || e.LCHRecipeName;
			}), Object.keys(mod).filter(function (e) {
				return e.match(/Launcher/);
			}));
		});
	
	});

});
