const mod = {

	OLSKControllerRoutes  () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'OLSKFundStubRoute',
			OLSKRouteFunction(req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteLanguages: ['en', 'fr', 'es'],
		}, {
			OLSKRoutePath: '/OLSKFundStubGrantRoute',
			OLSKRouteMethod: 'post',
			OLSKRouteSignature: 'OLSKFundStubGrantRoute',
			OLSKRouteFunction: function OLSKFundStubGrantRoute (req, res, next) {
				if (req.body.OLSKFundStubGrantRoute === 'OLSKFundStubGrantRouteExpired') {
					return res.json({
						OLSKPactGrantEndDate: new Date(Date.now() - 1000),
					});
				}

				return res.json({
					alfa: 'bravo',
				});
			},
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
