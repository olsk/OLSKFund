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

		InterfaceFakeErrorExpiredButtonDidClick () {
			mod.ControlGrant({
				OLSKFundStubGrantRoute: 'OLSKFundStubGrantRouteExpired',
			});
		},

		InterfaceFakeConfirmButtonDidClick () {
			exports.OLSKFundConfirm(window, window.OLSKLocalized);
		},

		InterfaceFakeParamAuthorizedButtonDidClick () {
			mod._ValueFakeParamAuthorized = true;
		},

		// CONTROL

		ControlGrant (inputData) {
			exports._OLSKFundSetupGrant({
				OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: window.OLSKPublicConstants('OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE'),
				OLSK_CRYPTO_PAIR_SENDER_PUBLIC: window.OLSKPublicConstants('OLSK_CRYPTO_PAIR_SENDER_PUBLIC'),
				ParamWindow: window,
				OLSK_FUND_API_URL: inputData.OLSK_FUND_API_URL || '/OLSKFundStubGrantRoute',
				ParamBody: {
					OLSKFundStubGrantRoute: inputData.OLSKFundStubGrantRoute,
					OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeEmail(),
					OLSKPactAuthIdentity: 'alfa@bravo.charlie',
					OLSKPactAuthProof: Math.random().toString(),
					OLSKPactPayIdentity: 'alfa@bravo.charlie',
					OLSKPactPayTransaction: Math.random().toString(),
					OLSKPactPayProcessor: OLSKPact.OLSKPactPayProcessorStripe(),
				},
				OLSKLocalized: window.OLSKLocalized,
				OLSKFundDispatchGrant: (function () {}),
				OLSKFundDispatchPersist: (function () {}),
				OLSK_TESTING_BEHAVIOUR: true,
			});
		},

	};

	window.OLSKFundBehaviour = mod;
})();
