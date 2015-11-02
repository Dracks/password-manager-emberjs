// app/authenticators/oauth2.js
import Ember from 'ember'
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from "../config/environment"

export default OAuth2PasswordGrant.extend({
	clientId: ['5y2UwmWUOkKXTh0U8a0OvS4m4j1zNLvAwqvlca0U', 'RPh1NpQv127EGJeyVQEbELN3IfV21WwtVJL761ubXXItgsuxiVJjHcdr858AUxn79gXyayI6kwQIlqib9K8iLzEUp3JUAXmmtrQnXV5DEuLulgdPe9OzSsQM4YSIj62r'],
	serverTokenEndpoint: ENV.APP.API_HOST+'/oauth/token/',
	serverTokenRevocationEndpoint: ENV.APP.API_HOST+'/oauth/revoke_token/',

	makeRequest(url, data) {
		var options = {
			url: url,
			data: data,
			type: 'POST',
			dataType: 'json',
			contentType: 'application/x-www-form-urlencoded'
		};
		var clientId = this.get('clientId');

		if (!Ember.isEmpty(clientId)) {
			var base64ClientId = window.btoa(clientId.join(':'));
			Ember.merge(options, {
				headers: {
					Authorization: 'Basic ' + base64ClientId
				}
			});
		}

		return Ember.$.ajax(options);
	}

});