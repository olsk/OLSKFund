const mod = {

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		if (!require('fs').existsSync(require('path').join(__dirname, 'node_modules'))) {
			return;
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
				'OLSKLocalStorage',
			].map(function (e) {
				const filePath = `./node_modules/${ e }/main.js`;
				require('fs').writeFileSync(filePath, require('fs').readFileSync(filePath, 'utf8').replace(/\bmod\b/g, e));
			})
		})();
	},

};

mod.LifecycleModuleDidLoad();
