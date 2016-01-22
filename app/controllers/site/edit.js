import Ember from 'ember';
//import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	cache: Ember.inject.service(),
	hasWriteAccess: function (){
		var parent=this.get('model.parent');
		if (parent){
			return parent.get('myPermission')>=2;
		}
		return true;
	}.property('model.parent.myPermission'),
	message: {
		show:false,
		timer: null,
		type: "info",
		text: ""
	},
	listGroupsFiltered: function (){
		var listGroups = this.get('cache.groupsList');
		if (listGroups) {
			return listGroups.filter(function(group){
				console.log("Group:"+group.get('name')+" with "+group.get('myPermission'));
				return group.get('myPermission')>=2;
			}).sortBy('path_name');
		}
		return [];
	}.property('listGroups', 'listGroups.@each.path_name'),
	actions: {
		save: function (){
			this.set('message', {
				show:false,
				timer: null,
				type: "error",
				text: ""
			});
			this.set('model.group', this.get('selectedGroup'));
			var promise=this.get('model').save();
			promise.then(function (){
				this.set('message',{
					show:true,
					timer: 10,
					type: "info",
					text: this.get('i18n').t('site.messages.save-ok', {})
				});
			}.bind(this), function (err){
				console.log(err);
				this.set('message', {
					show:true,
					timer: null,
					type: "error",
					text: err
				});
			}.bind(this));
		}
	}
});
