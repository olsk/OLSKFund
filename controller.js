const mod = {

	OLSKControllerRoutes  () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'OLSKFundStubRoute',
			OLSKRouteFunction(req, res, next) {
				require('fs').writeFileSync(require('path').join(__dirname, '__compiled/main.js'), `(function (require) { ${ require('fs').readFileSync(require('path').join(__dirname, 'main.js'), 'utf8') } })(() => exports)`);

				return res.render(require('path').join(__dirname, 'stub-view'));
			},
			OLSKRouteLanguages: ['en', 'fr', 'es'],
		}, {
			OLSKRoutePath: '/OLSKFundStubGrantRoute',
			OLSKRouteMethod: 'post',
			OLSKRouteSignature: 'OLSKFundStubGrantRoute',
			OLSKRouteFunction: async function OLSKFundStubGrantRoute (req, res, next) {
				return res.json({
					OLSK_FUND_ENCRYPTED_SIGNED: await require('OLSKCrypto').OLSKCryptoEncryptSigned(process.env.OLSK_CRYPTO_PAIR_RECEIVER_PUBLIC, process.env.OLSK_CRYPTO_PAIR_SENDER_PRIVATE, JSON.stringify({})),
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
