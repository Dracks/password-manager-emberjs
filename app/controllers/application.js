import Ember from 'ember';

export default Ember.Controller.extend({
	init: function (){
		$.ajaxPrefilter(function(options, originalOptions, xhr) {
			var hasToken=!!localStorage.jwt;
			if (hasToken){
				return xhr.setRequestHeader('Authorization', 'JWT '+localStorage.jwt);
			}
		});
	},
	loggedIn: function (){
		var hasLocalStorage=!!localStorage.jwt;
		if (hasLocalStorage){
			return new Ember.RSVP.Promise(function(resolve, reject){

				Ember.$.post('http://127.0.0.1:8000/api-token/verify',{token:localStorage.jwt}).then((function (){
					resolve(true);
				}),(function(){
					this.set('loggedIn', false);
					delete localStorage.jwt;
					resolve(false);
				}).bind(this));
			}.bind(this));
		} else {
			return false;
		}
	}.property(),

	actions: {
		logout: function() {
			delete localStorage.jwt;
			this.controllerFor('application').set('loggedIn', false);
			this.transitionTo('index');
		}
	}
});
