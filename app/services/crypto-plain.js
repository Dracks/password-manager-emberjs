import Ember from 'ember';

export default Ember.Service.extend({
	cypherType: 0,

	encrypt(data){
		return new Ember.RSVP.Promise(function (resolve){
			resolve(data)
		});
	},

	decrypt(data){
		return new Ember.RSVP.Promise(function (resolve){
			resolve(data)
		});
	}
});
