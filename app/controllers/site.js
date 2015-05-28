import Ember from 'ember';

export default Ember.Controller.extend({
    listGroups: function (){
        return this.store.find('group');
    }.property(),
    actions: {
        save: function (){
            this.get('model').save();
        }
    }
});
