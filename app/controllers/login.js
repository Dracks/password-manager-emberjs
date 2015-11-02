import Ember from 'ember';
//import { translationMacro as t } from "ember-i18n";
//import Defaults from '../../../config/defaults'

import ENV from "../config/environment"

var LoginController = Ember.Controller.extend({
	session: Ember.inject.service('session'),
	i18n: Ember.inject.service(),
	username:ENV.USER_DEFAULT,
	password:ENV.PASSWORD_DEFAULT,

	message: {
		show:false,
		message:""
	},

	actions: {
		login: function() {
			this.set('message', {
				show:false,
				timer: null,
				type: "error",
				text: ""
			});
			var username=this.get('username');
			var password=this.get('password');
			if (username.length>0 && password.length>0) {
				this.get('session').authenticate('authenticator:oauth2', username, password).catch(function (e) {
					var msg=this.get('i18n').t('application.errors.connection-error');
					if (e != '') {
						msg= e;
					}
					this.set('message', {
						show:true,
						text:msg
					});
					//alert('Login failed');
				}.bind(this));
			} else {
				//this.set('errorMessage', this.get('i18n').t('login.errors.data-required'))
				this.set('message', {
					show:true,
					text:this.get('i18n').t('login.errors.data-required')
				});
			}
		}
	}
});

export default LoginController;
