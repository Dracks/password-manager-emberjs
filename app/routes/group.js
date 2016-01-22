import Ember from 'ember';

export default Ember.Route.extend({
	cache: Ember.inject.service(),
	model: function (){
		return new Ember.RSVP.Promise(function (resolve, reject){
			this.get('cache').get('groupsList').then(function (data){
				resolve(data.filter(function (group){
					return group.get('parent.content')===null;
				}));
			}.bind(this), reject);
		}.bind(this));
	}
});
