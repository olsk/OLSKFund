const mod = {

	OLSKControllerRoutes  () {
		return [{
			OLSKRoutePath: '/stub/OLSKFund',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'OLSKFundStubRoute',
			OLSKRouteFunction(req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteLanguages: ['en', 'fr', 'es'],
		}];
	},

	OLSKControllerStaticAssetFiles () {
		return [
			'main.js',
		];
	},

	OLSKControllerSharedStaticAssetFolders () {
		return [
			'node_modules',
		];
	},

};

Object.assign(exports, mod);
