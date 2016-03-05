import Ember from 'ember';
//import { translationMacro as t } from "ember-i18n";

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	cache: Ember.inject.service(),
	newCypher : Ember.inject.service('crypto-symetric'),
	showPassword: false,
	decypherPassword: '',
	modelObserve: function (){
		this.set('showPassword', false);
		this.set('decypherPassword', '');
	}.observes('model.id'),
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
	save: function (model){
		var promise=model.save();
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
	},
	actions: {
		showPassword: function (){
			this.set('showPassword', true);
			var model = this.get('model');
			model.get('cypherType').decrypt(model.get('password')).then(function (password){
				this.set('decypherPassword', password);
			}.bind(this));
		},
		save: function (){
			this.set('message', {
				show:false,
				timer: null,
				type: "error",
				text: ""
			});
			var model = this.get('model');
			//model.set('group', this.get('selectedGroup'));
			if (this.get('showPassword')){
				var cypher = this.get('newCypher');
				model.set('cypherType', cypher);
				cypher.encrypt(this.get('decypherPassword')).then(function (password){
					model.set('password', password);
					this.save(model)
				}.bind(this), function (error){
					this.set('message', {
						show:true,
						timer: null,
						type: "error",
						text: error.message
					});
				}.bind(this));
			} else {
				this.save(model);
			}
		}
	}
});
