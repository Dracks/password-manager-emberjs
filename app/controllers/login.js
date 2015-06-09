
import Ember from 'ember';
//import Defaults from '../../../config/defaults'

var LoginController = Ember.Controller.extend({
	needs: 'application',
	previousTransition: null,
	username:'',
	password:'',

	errorMessage: '',
	hasError: function (){
		return this.get('errorMessage')!='';
	}.property('errorMessage'),


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
			var login_promise=this.get('controllers.application').login(this.get('username'), this.get('password'));
			login_promise.then(function (){
				this.loggedFunction();
			}.bind(this), function (e){
				if (e.responseText!=''){
					this.set('errorMessage', e.responseText);
				} else {
					this.set('errorMessage', "Comunication error");
				}

				//alert('Login failed');
			}.bind(this));
		},
		hideError: function (){
			this.set('errorMessage', "");
		}
	}
});

export default LoginController;
