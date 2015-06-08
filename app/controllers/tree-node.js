import Ember from 'ember';

export default Ember.Controller.extend({
	templateName: 'tree-node',
	tagName: 'li',
	has_children: Ember.computed.alias('model.has_children'),
	expanded: false,
	actions: {
		expand: function(){
			var expanded=this.get('expanded');
			this.set('expanded', !expanded);
		}
	}
});
