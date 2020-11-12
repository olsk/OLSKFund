(function() {
	const mod = {

		_ValueFakeParamAuthorized: false,

		// INTERFACE

		InterfaceLauncherButtonDidClick () {
			window.Launchlet.LCHSingletonCreate({
				LCHOptionRecipes: exports.OLSKFundRecipes({
					ParamWindow: window,
					OLSKLocalized: window.OLSKLocalized,
					ParamAuthorized: mod._ValueFakeParamAuthorized,
					OLSKFundDispatchGrant: (function () {}),
					OLSKFundDispatchPersist: (function () {}),
					OLSK_TESTING_BEHAVIOUR: true,
				}),
			});
		},

		InterfaceFakeErrorConnectionButtonDidClick () {
			mod.ControlGrant({
				OLSK_FUND_API_URL: 'http://localhost:' + Date.now().toString().slice(0, 5),
			});
		},

		InterfaceFakeErrorDecryptionButtonDidClick () {
			mod.ControlGrant({
				OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: Math.random().toString(),
			});
		},

		InterfaceFakeErrorSigningButtonDidClick () {
			mod.ControlGrant({
				OLSK_CRYPTO_PAIR_SENDER_PUBLIC: Math.random().toString(),
			});
		},

		async InterfaceFakeErrorExpiredButtonDidClick () {
			await exports._OLSKFundFakeGrantResponse(window.OLSKPublicConstants('OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC'), window.OLSKPublicConstants('OLSK_CRYPTO_PAIR_SENDER_PRIVATE'), {
				OLSKPactGrantEndDate: new Date(Date.now() - 1000),
			});
			mod.ControlGrant();
		},

		InterfaceFakeConfirmButtonDidClick () {
			exports.OLSKFundConfirm(window, window.OLSKLocalized);
		},

		InterfaceFakeParamAuthorizedButtonDidClick () {
			mod._ValueFakeParamAuthorized = true;
		},

		// CONTROL

		ControlGrant (inputData = {}) {
			exports._OLSKFundSetupGrant({
				OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: inputData.OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE || window.OLSKPublicConstants('OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE'),
				OLSK_CRYPTO_PAIR_SENDER_PUBLIC: inputData.OLSK_CRYPTO_PAIR_SENDER_PUBLIC || window.OLSKPublicConstants('OLSK_CRYPTO_PAIR_SENDER_PUBLIC'),
				ParamWindow: window,
				OLSK_FUND_API_URL: inputData.OLSK_FUND_API_URL || '/OLSKFundStubGrantRoute',
				ParamBody: {
					OLSKFundStubGrantRoute: inputData.OLSKFundStubGrantRoute,
					OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeEmail(),
					OLSKPactAuthIdentity: 'alfa@bravo.charlie',
					OLSKPactAuthProof: Math.random().toString(),
					OLSKPactPayIdentity: 'alfa@bravo.charlie',
					OLSKPactPayTransaction: Math.random().toString(),
				},
				OLSKLocalized: window.OLSKLocalized,
				OLSKFundDispatchGrant: (function () {}),
				OLSKFundDispatchPersist: (function () {}),
				OLSKFundDispatchFail: (function () {}),
				OLSK_TESTING_BEHAVIOUR: true,
			});
		},

	};

	window.OLSKFundBehaviour = mod;
})();
