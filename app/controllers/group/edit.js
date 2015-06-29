import Ember from 'ember';

export default Ember.Controller.extend({
	i18n: Ember.inject.service(),
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
		}).sortBy('path_name');
	}.property('listGroups.content', 'model.id'),
	parent: null,
	observesParent: function (){
		this.set('parent', this.get('model.parent'));
	}.observes('model.parent'),
	parentId: function (){
		return this.get('model.parent.id');
	}.property('model.parent.id'),
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