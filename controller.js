const mod = {

	OLSKControllerRoutes  () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'OLSKFundStubRoute',
			OLSKRouteFunction(req, res, next) {
				require('fs').writeFileSync(require('path').join(__dirname, '__compiled/main.js'), `(function (require) { ${ require('fs').readFileSync(require('path').join(__dirname, 'main.js'), 'utf8') } })((inputData) => window[inputData])`);

				return res.render(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteLanguageCodes: ['en', 'fr', 'es', 'pt'],
		}, {
			OLSKRoutePath: '/OLSKFundStubGrantRoute',
			OLSKRouteMethod: 'post',
			OLSKRouteSignature: 'OLSKFundStubGrantRoute',
			OLSKRouteFunction: async function OLSKFundStubGrantRoute (req, res, next) {
				return res.json({
					OLSK_FUND_GRANT_V1: await require('OLSKCrypto').OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, JSON.stringify({})),
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
			'__compiled',
		];
	},

};

Object.assign(exports, mod);
