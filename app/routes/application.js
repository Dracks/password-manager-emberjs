// app/routes/application.js
import Ember from "ember";
//import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
var Application=Ember.Route.extend({
	setupController: function(controller, model) {
		controller.set('loggedIn', !!localStorage.jwt);
		Ember.$.post('http://127.0.0.1:8000/api-token/verify',{token:localStorage.jwt}).then(function (data){

		}.bind(this), function(){
			controller.set('loggedIn', false);
			delete localStorage.jwt;
		});
		$.ajaxPrefilter(function(options, originalOptions, xhr) {
			var hasToken=!!localStorage.jwt;
			if (hasToken){
				return xhr.setRequestHeader('Authorization', 'JWT '+localStorage.jwt);
			}
		});
	},

	actions: {
		logout: function() {
			delete localStorage.jwt;
			this.controllerFor('application').set('loggedIn', false);
			this.transitionTo('index');
		}
	}
});
export default Application;