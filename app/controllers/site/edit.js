import Ember from 'ember';
//import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	message: {
		show:false,
		timer: null,
		type: "info",
		text: ""
	},
	init: function (){
		this.store.find('group').then(function (data){
			this.set('listGroups', data);
		}.bind(this));
	},
	observesGroup: function (){
		console.log('observesGroup');
		this.set('selectedGroup', this.get('group'));
	}.observes('model.group.id'),
	listGroups: [],
	listGroupsSorted: function (){
		return this.get('listGroups').sortBy('path_name');
	}.property('listGroups'),
	group: function (){
		var groupId=this.get('model.group.id');
		var listGroups=this.get('listGroups');
		var ret=listGroups.find(function (e){
			return e.get('id')==groupId
		});
		return ret;
	}.property('model.group.id', 'listGroups.content'),
	selectedGroup: null,
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
				})
			}.bind(this), function (err){
				console.log(err);
				this.set('message', {
					show:true,
					timer: null,
					type: "error",
					text: err
				})
			}.bind(this))
		}
	}
});
