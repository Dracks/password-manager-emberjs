import Ember from "ember"

var protectedRoute = Ember.Route.extend({
	goToLogin: function (previousTransition){
		var loginController = this.controllerFor('login');
		loginController.set('previousTransition', previousTransition);
		this.transitionTo('login');
	},
	beforeModel: function(transition) {

		var application=this.controllerFor('application');

		var hasLogged=application.get('loggedIn');
		if (hasLogged) {
			return;
		} else {
			this.goToLogin(transition);
		}
	}
});

export default protectedRoute