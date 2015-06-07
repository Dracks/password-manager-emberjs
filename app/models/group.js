
import DS from 'ember-data';

export default DS.Model.extend({
	parent: DS.belongsTo('group', {async:true}),
	name: DS.attr('string'),
	children: DS.hasMany('group', {async:true, inverse:'parent'}),
	has_children: function (){
		return this.get('children.length')!=0
	}.property('children.length')
});