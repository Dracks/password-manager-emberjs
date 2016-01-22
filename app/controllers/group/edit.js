import Ember from 'ember';

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
	cache: Ember.inject.service(),
	hasWriteAccess: Ember.computed('model.myPermission', function (){
		return this.get('model.myPermission')>=3;
	}),
	hasNtWriteAccess: Ember.computed('hasWriteAccess', function (){
		return !this.get('hasWriteAccess');
	}),
	listGroupsFiltered: function (){
		var model=this.get('model');
		var pending=[model];
		var filter=[];
		var list=this.get('cache.groupsList');
		var addChildToPending= function (child){
			pending.push(child);
		};

		while (pending.length>0){
			var fetch=pending.shift();
			filter.push(fetch.get('id'));
			fetch.get('children').forEach(addChildToPending);
		}
		return list.filter(function(group){
			return !(filter.contains(group.get('id'))) && group.get('myPermission')>=3;
		}).sortBy('path_name');
	}.property('listGroups.@each.path_name', 'model.id'),
	parent: Ember.computed.oneWay('model.parent'),
	message: Ember.create({
		show:false,
		timer: 0,
		type: "info",
		text: ""
	}),
	actions: {
		save: function (){
			this.set('message', {
				show:false,
				timer: null,
				type: "error",
				text: ""
			});
			var parentId=this.get('parentId');
			var parent=this.get('listGroupsFiltered').find(function (e){
				return e.get('id')==parentId;
			});
			this.set('model.parent', parent);
			var promise=this.get('model').save();
			promise.then(function (){
				this.set('message', Ember.create({
					show: true,
					timer: 10,
					type: "info",
					text: this.get('i18n').t("group.messages.save-ok")
				}));
			}.bind(this), function (err){
				console.log(err);
				this.set('message', {
					show:true,
					timer: null,
					type: "error",
					text: err
				});
			}.bind(this))
		}
	}
});
