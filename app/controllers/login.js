import Ember from 'ember';
//import { translationMacro as t } from "ember-i18n";
//import Defaults from '../../../config/defaults'

var LoginController = Ember.Controller.extend({
	needs: 'user-session',
	previousTransition: null,
	i18n: Ember.inject.service(),
	username:'',
	password:'',

	message: {
		show:false,
		message:""
	},

	loggedFunction: function (){
		// Log the user in, then reattempt previous transition if it exists.
		var previousTransition = this.get('previousTransition');
		if (previousTransition) {
			this.set('previousTransition', null);
			previousTransition.retry();
		} else {
			// Default back to homepage
			this.transitionToRoute('site');
		}
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
				var login_promise = this.get('controllers.user-session').login(username, password);
				login_promise.then(function () {
					this.loggedFunction();
				}.bind(this), function (e) {
					var msg=this.get('i18n').t('application.errors.connection-error');
					if (e.responseText != '') {
						msg= e.responseText;
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
