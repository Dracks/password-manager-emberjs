// app/routes/application.js
import Ember from "ember";

var Application=Ember.Route.extend({
	afterModel: function(user) {
		//this.set('i18n.locale', user.get('locale'));
	}
});
export default Application;