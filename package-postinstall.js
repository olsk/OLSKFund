const mod = {

	// SETUP

	SetupEverything() {
		if (!require('fs').existsSync(require('path').join(__dirname, 'node_modules'))) {
			return false;
		}
		
		(function OLSKHotfixLaunchletForSkipWait() {
			const filePath = './node_modules/launchlet/__compiled/launchlet.js';
			require('fs').writeFileSync(filePath, require('OLSKString').OLSKStringPatch(
				require('fs').readFileSync(filePath, 'utf8'),
				',100',
				',1',
			));
		})();

		(function OLSKHotfixModulesForWindow() {
			[
				'OLSKPact',
				'OLSKCrypto',
			].map(function (e) {
				const filePath = `./node_modules/${ e }/main.js`;
				require('fs').writeFileSync(filePath, require('fs').readFileSync(filePath, 'utf8').replace(/\bmod\b/g, e));
			})
		})();

		(function OLSKHotfixOLSKCryptoForRequire() {
			const filePath = './node_modules/OLSKCrypto/main.js';
			require('fs').writeFileSync(filePath, require('fs').readFileSync(filePath, 'utf8').replace("const openpgp = require('openpgp');", "const openpgp = (function() { return typeof require === 'undefined' ? window.openpgp : require('openpgp'); })();"));
		})();
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleDidLoad();
