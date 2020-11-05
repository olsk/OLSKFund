(function() {
	const mod = {

		_ValueFakeGrantAuthorized: false,

		// INTERFACE

		InterfaceLauncherButtonDidClick () {
			window.Launchlet.LCHSingletonCreate({
				LCHOptionRecipes: exports.OLSKFundRecipes({
					WindowObject: window,
					OLSKLocalized: window.OLSKLocalized,
					GrantAuthorized: mod._ValueFakeGrantAuthorized,
					OLSK_TESTING_BEHAVIOUR: true,
				}),
			});
		},

		InterfaceFakeErrorConnectionButtonDidClick () {
			mod.ControlGrant({
				ParamURL: 'http://localhost:' + Date.now().toString().slice(0, 5),
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

		InterfaceFakeGrantAuthorizedButtonDidClick () {
			mod._ValueFakeGrantAuthorized = true;
		},

		// CONTROL

		ControlGrant (inputData) {
			exports._OLSKFundSetupGrant({
				OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: window.OLSKPublicConstants('OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE'),
				OLSK_CRYPTO_PAIR_SENDER_PUBLIC: window.OLSKPublicConstants('OLSK_CRYPTO_PAIR_SENDER_PUBLIC'),
				ParamWindow: window,
				ParamURL: inputData.ParamURL || '/OLSKFundStubGrantRoute',
				ParamBody: {
					OLSKFundStubGrantRoute: inputData.OLSKFundStubGrantRoute,
					OLSKPactAuthType: OLSKPact.OLSKPactAuthTypeEmail(),
					OLSKPactAuthIdentity: 'alfa@bravo.charlie',
					OLSKPactAuthProof: Math.random().toString(),
					OLSKPactPayIdentity: 'alfa@bravo.charlie',
					OLSKPactPayTransaction: Math.random().toString(),
					OLSKPactPayProcessor: OLSKPact.OLSKPactPayProcessorStripe(),
				},
				ParamLocalize: window.OLSKLocalized,
				ParamDispatchGrant: (function () {
				}),
				OLSK_TESTING_BEHAVIOUR: true,
			});
		},

	};

	window.OLSKFundBehaviour = mod;
})();
