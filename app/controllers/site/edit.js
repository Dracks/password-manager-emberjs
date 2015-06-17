import Ember from 'ember';

export default Ember.Controller.extend({
	listGroups: function (){
		return this.store.find('group');
	}.property(),
	group: function (){
		var groupId=this.get('model.group.id');
		var listGroups=this.get('listGroups');
		var ret=listGroups.find(function (e){
			return e.get('id')==groupId
		});
		return ret;
	}.property('model.group', 'listGroups.content'),
	selectedGroup: null,
	actions: {
		save: function (){
			this.set('model.group', this.get('selectedGroup'));
			this.get('model').save();
		}
	}
});
