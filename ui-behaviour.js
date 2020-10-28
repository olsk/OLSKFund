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

		InterfaceFakeGrantAuthorizedButtonDidClick () {
			mod._ValueFakeGrantAuthorized = true;
		},

	};

	window.OLSKFundBehaviour = mod;
})();
