import Ember from 'ember';

export default Ember.Controller.extend({
	needs:['group'],
	groupController: Ember.computed.alias('controllers.group'),
	i18n: Ember.inject.service(),
	templateName: 'tree-node',
	tagName: 'li',
	has_children: Ember.computed.alias('model.has_children'),
	expanded: false,
	actions: {
		expand: function(){
			var expanded=this.get('expanded');
			this.set('expanded', !expanded);
		},
		remove: function (){
			var i18n=this.get('i18n');
			if (this.get('has_children')){
				this.get('groupController').set('message', {
					show:true,
					text: i18n.t("group.errors.with-children"),
					type: "error"
				});
			} else if (confirm(i18n.t("group.confirm.delete", {group:this.get('model.name')}))){
				this.get('model').destroyRecord().then(function (){
					this.get('groupController').set('message', {
						show:true,
						text: i18n.t("group.messages.deleted-ok"),
						type: "info"
					});
				}.bind(this), function (err){
					var msg=this.get('i18n').t('application.errors.connection-error');
					if (err.responseText != '') {
						msg= err.responseText;
					}
					this.get('groupController').set('message', {
						show:true,
						text: msg,
						type: "error"
					});
				}.bind(this));
			}
		}
	}
});
