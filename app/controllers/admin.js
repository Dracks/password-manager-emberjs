import Ember from 'ember';
import StringUtils from '../utils/string-utils';

export default Ember.Controller.extend({
	symmetric: Ember.inject.service('crypto-symetric'),

	ivRandom: function (){
		return JSON.stringify(StringUtils.convertFromArrayBufferView(crypto.getRandomValues(new Uint8Array(16))));
	}.property(),
	symmetricNewKey: function (){
		return new Ember.RSVP.Promise(function (resolve, reject){
			var symmetric = this.get('symmetric');
			symmetric.generateKey().then(function (data){
				var promise=symmetric.exportKey(data);
				promise.then(resolve, reject);
				promise.then(function (data){
					console.log(data);
				}, function (err){
					console.log(err.message);
				});
			},reject);
		}.bind(this));
	}.property(),
	symmetricCurrentKey: function (){
		/*return new Ember.RSVP.Promise(function (resolve, reject){
			var symmetric = this.get('symmetric');
			symmetric.get('currentKey').then(function (data){
				var promise=symmetric.exportKey(data);
				promise.then(resolve, reject);
				promise.then(function (data){
					console.log(data)
				}, function (err){
					console.log(err.message)
				});
			},reject)
		}.bind(this))*/
		return "";
	}.property()
});
