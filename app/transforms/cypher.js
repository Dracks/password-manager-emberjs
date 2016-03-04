import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
	symmetric: Ember.inject.service('crypto-symetric'),
	plain: Ember.inject.service('crypto-plain'),

	deserialize: function (serialized) {
		var ret = this.get('plain');
		switch (serialized) {
			case 1:
				ret = this.get('symmetric')
		}
		return ret;
	},

	serialize: function (deserialized) {
		return deserialized.get('cypherType');
	}
});
