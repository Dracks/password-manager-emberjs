// app/authenticators/oauth2.js
import Ember from 'ember';
import JsOauth2 from 'ember-jsingla-libs/authenticators/js-oauth';
import ENV from "../config/environment";

export default JsOauth2.extend({
	clientId: [ENV.API_CLIENT_ID, ENV.API_CLIENT_SECRET],
	serverTokenEndpoint: ENV.APP.API_HOST+'/oauth/token/',
	serverTokenRevocationEndpoint: ENV.APP.API_HOST+'/oauth/revoke_token/'
});
