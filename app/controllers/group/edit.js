import Ember from 'ember';

export default Ember.Controller.extend({
	listGroups: function (){
		return this.store.find('group');
	}.property(),
	idGroup: function (){
		return this.get('model.parent.id');
	}.property('model.parent.id'),
	idGroupObserver: function (){
		selectedId=this.get('idGroup');
		this.set('model.parent', this.get('listGroups').find(function (e){
			return e.get('id')==selectedId;
		}));
	}.observes('idGroup'),
	actions: {
		save: function (){
			this.get('model').save();
		}
	}
});