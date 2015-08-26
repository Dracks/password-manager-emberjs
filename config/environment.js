/* jshint node: true */

module.exports = function(environment) {
	var ENV = {
		modulePrefix: 'view',
		environment: environment,
		baseURL: process.env.BASE_URL,
		locationType: 'auto',
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
			}
		},
		contentSecurityPolicy:{
			'connect-src': process.env.API_HOST+" http://localhost:4200",
			'style-src': "default-src style-src 'self' 'unsafe-inline'"
		},

		APP: {
			// Here you can pass flags/options to your application instance
			// when it is created
			API_AUTH_NAMESPACE:'api-token',
			API_HOST: process.env.API_HOST,
			API_NAMESPACE: process.env.API_NAMESPACE
		},
		i18n:{
			defaultLocale: 'en'
		},
		userDefault: process.env.USER_DEFAULT,
		passwordDefault: process.env.PASSWORD_DEFAULT
	};

	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
		ENV.APP.API_HOST = 'http://localhost:8000';
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.baseURL = '/';
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	return ENV;
};
