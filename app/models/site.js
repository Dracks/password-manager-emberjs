import DS from 'ember-data';

export default DS.Model.extend({
	crypto: Ember.inject.service(),
	group: DS.belongsTo('group', {async: true}),
	name: DS.attr('string'),
	description: DS.attr('string'),
	user: DS.attr('string'),
	cypherType: DS.attr('cypher'),
	password: DS.attr('string'),
	url: DS.attr('string')
});
