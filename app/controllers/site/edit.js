import Ember from 'ember';

export default Ember.Controller.extend({
    listGroups: function (){
        return this.store.find('group');
    }.property(),
    idGroup: function (){
        return this.get('model.group.id');
    }.property('model.group.id'),
    idGroupObserver: function (){
        selectedId=this.get('idGroup');
        this.set('model.group', this.get('listGroups').find(function (e){
            return e.get('id')==selectedId;
        }));
    }.observes('idGroup'),
    actions: {
        save: function (){
            this.get('model').save();
        }
    }
});
