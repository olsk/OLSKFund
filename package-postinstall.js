const mod = {

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		(function OLSKHotfixLaunchletForSkipWait() {
			const filePath = require('path').join(__dirname, 'launchlet/__compiled/launchlet.js');
			
			if (!require('fs').existsSync(filePath)) {
				return;
			}
			
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
				const filePath = require('path').join(__dirname, `${ e }/main.js`);
				
				if (!require('fs').existsSync(filePath)) {
					return;
				}
				
				require('fs').writeFileSync(filePath, require('fs').readFileSync(filePath, 'utf8').replace(/\bmod\b/g, e));
			})
		})();
	},

};

mod.LifecycleModuleDidLoad();
