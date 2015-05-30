import Ember from "ember";

var protectedRoute = Ember.Route.extend({
	goToLogin: function (previousTransition){
		var loginController = this.controllerFor('login');
		loginController.set('previousTransition', previousTransition);
		this.transitionTo('login');
	},
	beforeModel: function(transition) {

		var application=this.controllerFor('application');

		var hasLogged=application.get('loggedIn');
		return new Ember.RSVP.Promise(function(resolve) {
			resolve(hasLogged);
		}).then(function (value){
			if (!value){
				this.goToLogin(transition)
			}
		}.bind(this));
	}
});

export default protectedRoute;