
import Ember from 'ember'

var LoginController = Ember.Controller.extend({
    needs: 'application',
    previousTransition: null,
    username:"dracks",
    password:'123456',

    loggedFunction: function (){
		// Log the user in, then reattempt previous transition if it exists.
		var previousTransition = this.get('previousTransition');
		if (previousTransition) {
			this.set('previousTransition', null);
			previousTransition.retry();
		} else {
			// Default back to homepage
			this.transitionToRoute('sites');
		}
	},

    actions: {
        login: function() {
            delete localStorage.jwt;
            var loginTime=new Date();

            Ember.$.post('http://127.0.0.1:8000/api-token/auth', {

                username: this.get('username'),
                password: this.get('password')

            }).then(function(data) {
                this.get('controllers.application').loggedInWithToken(data);
                this.loggedFunction();
            }.bind(this), function() {
            alert('Login failed');
            });
        }
    }
});

export default LoginController;
