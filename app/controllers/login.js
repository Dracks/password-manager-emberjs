
import Ember from 'ember';
//import Defaults from '../../../config/defaults'

var LoginController = Ember.Controller.extend({
    needs: 'application',
    previousTransition: null,
    username:'',
    password:'',

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
            }.bind(this), function (){
                alert('Login failed');
            }.bind(this));
        }
    }
});

export default LoginController;
