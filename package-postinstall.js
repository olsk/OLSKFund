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
	},

};

mod.LifecycleModuleDidLoad();
