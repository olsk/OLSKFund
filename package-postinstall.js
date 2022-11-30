const mod = {

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		const directory = require('path').join(__dirname, 'node_modules');

		if (!require('fs').existsSync(directory)) {
			return;
		}
		
		(function OLSKHotfixLaunchletForSkipWait() {
			const filePath = require('path').join(directory, 'launchlet/__compiled/launchlet.js');
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
				'OLSKLocalStorage',
			].map(function (e) {
				const filePath = require('path').join(directory, `${ e }/main.js`);
				require('fs').writeFileSync(filePath, require('fs').readFileSync(filePath, 'utf8').replace(/\bmod\b/g, e));
			})
		})();
	},

};

mod.LifecycleModuleDidLoad();
