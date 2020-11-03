(function OLSKHotfixLaunchletForSkipWait() {
	const filePath = './node_modules/launchlet/__compiled/launchlet.js';
	require('fs').writeFileSync(filePath, require('OLSKString').OLSKStringPatch(
		require('fs').readFileSync(filePath, 'utf8'),
		',100',
		',1',
	));
})();
