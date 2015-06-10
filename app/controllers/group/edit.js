import Ember from 'ember';

export default Ember.Controller.extend({
	listGroups: function (){
		return this.store.find('group');
	}.property(),
	listGroupsFiltered: function (){
		var model=this.get('model');
		var pending=[model];
		var filter=[];
		var list=this.get('listGroups');
		var addChildToPending= function (child){
			pending.push(child);
		};

		while (pending.length>0){
			var fetch=pending.shift();
			filter.push(fetch.get('id'));
			fetch.get('children').forEach(addChildToPending);
		}
		return list.filter(function(group){
			return !(filter.contains(group.get('id')));
		});
	}.property('listGroups.@each.id', 'model.id'),
	actions: {
		save: function (){
			this.get('model').save();
		}
	}
});