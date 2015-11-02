import DS from 'ember-data';

export default DS.Model.extend({
	group: DS.belongsTo('group', {async: true}),
	name: DS.attr('string'),
	description: DS.attr('string'),
	user: DS.attr('string'),
	password: DS.attr('string'),
	url: DS.attr('string')
});