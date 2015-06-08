
import DS from 'ember-data';

export default DS.Model.extend({
	parent: DS.belongsTo('group', {async:true, inverse:'children'}),
	name: DS.attr('string'),
	children: DS.hasMany('group', {async:true, inverse:'parent'}),
	has_children: function (){
		return this.get('children.length')!==0;
	}.property('children.length'),
	path_name: function (){
		var path=this.get('parent.path_name');
		if (path!==undefined){
			return path+'>'+this.get('name');
		} else {
			return this.get('name');
		}
	}.property('name', 'parent.path_name')
});